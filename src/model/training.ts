import { Address } from './address';

/**
 * Training hours should be deducted from contracted hours, and add it onto uncontracted staff hours.
 * Example: If contractor is doing 7 hours of training in a week, and contractor is contracted to do
 * 35 hours per week, then deduct the 7 hours from 35 hours, and re-allocate to a non-contractor. So contractor
 * would do 28 hours but still get paid for the 35 hours - this includes the training (training is paid time)
 */
export class Training {
    name: string;
    duration: number;
    address: Address;
}