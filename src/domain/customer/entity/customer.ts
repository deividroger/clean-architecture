import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
   
   private _name : string;
   private _address!: Address;
   private _active: boolean = false;
   private _rewardPoints: number = 0;
   

   public onAddressChanged?: (address: Address) => void;

    
    constructor(id: string,name: string,onCreated?:Function) {
        super();
        this._id = id;
        this._name = name;
        
        this.validate();
        
        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
        
        onCreated && onCreated();
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {

        if(this._address === undefined) {

            throw new Error('Address is mandatory to activate a customer');
        }

        this._active = true;
    }

    isActive():boolean {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        CustomerValidatorFactory
            .create()
            .validate(this);
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }


    get rewardPoints() {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

     changeAddress(address: Address) {
        this._address = address;

        this.onAddressChanged && this.onAddressChanged(address);

    }

    get Address(): Address {
        return this._address;
    }
}