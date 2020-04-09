import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import { fleet } from '../fleet-data.js';
import { DataError} from './data-error.js';

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.error = [];
    }


    loadData(fleet) {
        for (let data of fleet) {
            switch(data.type) {
                case 'car':
                    if (this.validateCarData(data)){
                        let car = this.loadCar(data);
                        this.cars.push(car);
                        break;
                    } else {
                        let e = new DataError('invalid car data', data);
                        this.error.push(e)
                    }
                case 'drone':
                    this.drones.push(data);
                    break;
                default: 
                    let e = new DataError('Invalid vehicle type', data);
                    this.error.push(e);
                    break;
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch(e) {
            this.error.push(new DataError('error loading car', car))
        }
    }

    validateCarData(car) {
        let requiredProps = 'license model latLong miles make';
        let hasErrors = false;

        for (let field of requiredProps) {
            if (!car[field]) {
                this.error.push(new DataError('invalid feild type for cars'), car[field]);
                hasErrors = true;
            }
        }
    }
}