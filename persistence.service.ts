import { Injectable, OnDestroy } from '@angular/core';
import { SettingsService } from '../services/settings.service';

import { GPSInfo } from '../entities/gps-info';
import { Sponsor } from '../entities/sponsor';
import { TeamMember } from '../entities/team-member';
import * as firebase from 'nativescript-plugin-firebase';
import { User, ServerValue } from 'nativescript-plugin-firebase';
import { IslamicUser } from '../auth/islamic-user';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService implements OnDestroy{
    constructor(
        protected _settings: SettingsService
    ) {
        this._settings.debug && console.log("PersistenceService.new");
        //firebase.enableLogging(this._settings.debug);
    }

    async init() {
        this._settings.debug && console.log("PersistenceService.init");
        return await firebase.init({ persist: true })
            .then((result) => {
                if (this.debug)
                    console.log("PersistenceService.init firebase.init.then():", result);

                firebase.keepInSync("/users", true).then(() => {

                    var onValueEvent = (result: firebase.FBData) => {
                        console.log("result: " + JSON.stringify(result));
                        console.log("Event type: " + result.type);
                        console.log("Key: " + result.key);
                        console.log("Value: " + JSON.stringify(result.value));
                    };

                    return firebase.addChildEventListener(onValueEvent, "/users").then(
                        (listenerWrapper: firebase.AddEventListenerResult) => {
                            this._settings.debug && console.log("PersistenceService.init firebase.init.then firebase.addChildEventListener", listenerWrapper);
                            var path = listenerWrapper.path;
                            var listeners = listenerWrapper.listeners; // an Array of listeners added
                            // you can store the wrapper somewhere to later call 'removeEventListeners'
                            return;
                        }
                    ).catch((error) => console.log("PersistenceService.init firebase.init.then firebase.addChildEventListener.catch", error));
                });

                return result;
            })
            .catch((error) => {
                if (this.debug)
                    console.log("AuthService.new(): firebase.init.catch()", error);
                throw error;
            })
    }

    async ngOnDestroy() {
        return this.close();
    }

    async close(){
        return Promise.resolve();
    }

    /**
     *
     */
    get debug(): boolean {
        return this._settings.debug;
    }

    registerStatus(user: IslamicUser): void {
        firebase.setValue("/users/" + user.uid, user);
    }

    updateUserPosition(user: IslamicUser, position: GPSInfo) {
        if (this.debug)
            console.log("PersistenceService.updateUserPosition", user, position);

        position.updated = ServerValue.TIMESTAMP;
        firebase.setValue("/users/" + user.uid + "/position", position)
            .then(() => {
                if (this.debug) console.log("PersistenceService.updateUserPosition firebase.setValue");

                return firebase.getValue("/users/" + user.uid + "/position/updated")
                    .then((snapshot) => {
                        if (this.debug)
                            console.log("PersistenceService.updateUserPosition firebase.getValue", snapshot);

                        return firebase
                            .setValue("/users_position_history/" + user.uid + "/posistions/" + snapshot.value, position);
                    })
            });
    }

}
