import { Injectable } from '@angular/core';
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
export class PersistenceService {

    constructor(
        protected _settings: SettingsService
    ) {
        var onValueEvent = function (result) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        };

        firebase.addValueEventListener(onValueEvent, "/users").then(
            function (listenerWrapper) {
                var path = listenerWrapper.path;
                var listeners = listenerWrapper.listeners; // an Array of listeners added
                // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }

    /**
     *
     */
    get debug(): boolean {
        return this._settings.debug;
    }

    registerStatus(user: IslamicUser): void {
        firebase.setValue("/users/" + user.uid, user);

        firebase.getValue("/users/" + user.uid + "/availability/hello")
            .then(snapshot => console.log("authService.registerStatus() helloRef.get().then()", snapshot.value))
            .catch(err => console.log("authService.registerStatus() helloRef.get().catch()", + err));

    }

    updateUserPosition(user: IslamicUser, position: GPSInfo) {
        if (this._settings.debug)
            console.log("PersistenceService.updateUserPosition", user, position);

        position.updated = ServerValue.TIMESTAMP;
        firebase.setValue("/users/" + user.uid + "/position", position)
            .then(() => {
                if (this.debug) console.log("PersistenceService.updateUserPosition firebase.setValue");

                return firebase.getValue("/users/" + user.uid + "/position/updated")
                    .then((snapshot) => {
                        if (this._settings.debug)
                            console.log("PersistenceService.updateUserPosition firebase.getValue", snapshot);

                        return firebase
                            .setValue("/users_position_history/" + user.uid + "/posistions/" + snapshot.value, position);
                    })
            });
    }

}
