import { NgModule, NO_ERRORS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PersistenceModule  {

    constructor() {
    }


}
