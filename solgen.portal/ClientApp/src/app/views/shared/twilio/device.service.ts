import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from '@aspnet/signalr';
import { ReplaySubject, Observable } from 'rxjs';

export type Devices = MediaDeviceInfo[];

@Injectable({
    providedIn: 'root'
})
export class DeviceService implements OnDestroy {
    $devicesUpdated: Observable<Promise<Devices>>;
    $isAccessGranted: Subject<boolean>=new Subject<boolean>();
    get AccessGranted() {
        return this.$isAccessGranted;
    }
    set AccessGranted(value: any) {
        this.$isAccessGranted.next(value);
    }
    
    private deviceBroadcast = new ReplaySubject<Promise<Devices>>();

    constructor() {
        if (navigator && navigator.mediaDevices) {
            ;
            navigator.mediaDevices.ondevicechange = (_: Event) => {
                this.deviceBroadcast.next(this.getDeviceOptions());
            }
        }

        this.$devicesUpdated = this.deviceBroadcast.asObservable();
        this.deviceBroadcast.next(this.getDeviceOptions());
    }

    ngOnDestroy(): void {
        if (this.deviceBroadcast) {
            this.deviceBroadcast.unsubscribe();
        }
    }

    private async isGrantedMediaPermissions() {
        if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Chrome') > 0) {
            return true; // Follows standard workflow for non-Chrome browsers.
        }
        ;
        if (navigator && navigator['permissions']) {
            try {
                const result = await navigator['permissions'].query({ name: 'camera' });
                
                if (result) {
                    if (result.state === 'granted') {
                        
                        return true;
                    } else {
                        ;
                        const isGranted = await new Promise<boolean>(resolve => {
                            result.onchange = (_: Event) => {
                                
                                const granted = _.target['state'] === 'granted';
                                if (granted) {
                                    resolve(true);
                                }
                            }
                        });
                        return isGranted;
                    }
                }
            } catch (e) {
                ;
                // This is only currently supported in Chrome.
                // https://stackoverflow.com/a/53155894/2410379
                return true;
            }
        }

        return false;
    }
    mediaDevices: any = []
    private async getDeviceOptions(): Promise<Devices> {
        const isGranted = await this.isGrantedMediaPermissions();
        
        if (navigator && navigator.mediaDevices && isGranted) {
            this.AccessGranted = isGranted;
            let devices = await this.tryGetDevices();
            if (devices.every(d => !d.label)) {
                devices = await this.tryGetDevices();
            }
            return devices.filter(d => !!d.label);
        }

        return null;
    }
    getMediaDevices() {
        return this.mediaDevices;
    }
    gotDevices(mediaDevices) {
        ;
        this.mediaDevices = mediaDevices;
        // select.innerHTML = '';
        // select.appendChild(document.createElement('option'));
        // let count = 1;
        // mediaDevices.forEach(mediaDevice => {
        //   if (mediaDevice.kind === 'videoinput') {
        //     const option = document.createElement('option');
        //     option.value = mediaDevice.deviceId;
        //     const label = mediaDevice.label || `Camera ${count++}`;
        //     const textNode = document.createTextNode(label);
        //     option.appendChild(textNode);
        //     select.appendChild(option);
        //   }
        // });
        return mediaDevices;
    }

    private async tryGetDevices() {
        // console.log('this is test')

        const mediaDevices = await navigator.mediaDevices.enumerateDevices().then(res => {
            this.gotDevices(res);
            // console.log('this is test', res)
            return res;
        });
        const devices = ['audiooutput', 'videoinput'].reduce((options, kind) => {
            return options[kind] = mediaDevices.filter(device => device.kind === kind);
        }, [] as Devices);

        return devices;
    }
}
