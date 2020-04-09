import {Car} from  './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from '../src/services/fleet-data-services.js';

let dataService = new FleetDataService();
dataService.loadData(fleet);

for (let car of dataService.errors)
    console.log(car);
