import { Component, Input } from '@angular/core';
import { Person, Staff, Client, Availability, DayOfWeek } from '../model/model';

export class AvailabilityComponent {

    /**
     * The person to which we assign the availability to. Note, that a person can have many
     * availabilities.
     */
    @Input() person: Person;

    /**
     * Represents the days of the week that both client and staff are available
     */
    day: DayOfWeek[];

    /**
     * Represents the hours for both staff and client.
     * Staff - This is the total number of hours that they are available during the course of a week.
     * Client - The total number of hours support the client receives each week.
     */
    hoursPerWeek: number;

    /**
     * Represents the number of allocated hours for a given day.
     *
     */
    hoursPerDay: Map<DayOfWeek, number>[];
}