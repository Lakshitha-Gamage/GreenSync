import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { OrganizeEventComponent } from 'src/app/components/events/organize-event/organize-event.component';
import { ViewEventComponent } from 'src/app/components/events/view-event/view-event.component';

interface Event {
  _id: string;
  eventName: string;
  eventTime: string;
  eventLocation: string;
  eventOrganizer: string;
  eventParticipant: any[]; // Update the type based on your actual data structure
  eventDescription: string;
  eventStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  public isOrganizeCompVisible: boolean = false;
  public isViewEventCompVisible: boolean = false;
  public events: Event[] = [];
  constructor(public dialog: MatDialog, private http: HttpClient, private datePipe: DatePipe) { }

  public imagePaths: string[] = [
    'app/assets/event-list-img-1.jpg',
    'app/assets/event-list-img-2.jpg',
    'app/assets/event-list-img-3.jpg',
    'app/assets/event-list-img-4.jpg',
    'app/assets/event-list-img-5.jpg',
    'app/assets/event-list-img-6.jpg',
    'app/assets/event-list-img-7.jpg',
    'app/assets/event-list-img-8.jpg',
    'app/assets/event-list-img-9.jpg',
    'app/assets/event-list-img-10.jpg',
  ];

  ngOnInit(): void {
    this.fetchEvents();
  }

  onClickOrganizeEvents(){
    this.isOrganizeCompVisible = !this.isOrganizeCompVisible;
    if (this.isOrganizeCompVisible) {
      this.openOrganizeEventDialog();
    }
  }

  onClickViewMyEvents(){

  }

  openOrganizeEventDialog(): void {
    const dialogRef = this.dialog.open(OrganizeEventComponent, {
      height: '600px',
      width: '1000px', // Adjust the width as needed
      // Add any other configuration options for your dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOrganizeCompVisible = false;
      this.ngOnInit();
      // Handle any data or actions after the dialog is closed
    });
  }

  fetchEvents() {
    // Make an HTTP request to fetch events from your server
    this.http.get<Event[]>('http://localhost:5001/api/events/get-events').subscribe(events => {
      // Assign the retrieved events to the component property
      this.events = events.map(event => ({
        _id: event._id,
        eventName: event.eventName,
        eventTime: event.eventTime,
        eventLocation: event.eventLocation,
        eventDescription: event.eventDescription,
        eventOrganizer: event.eventOrganizer,
        eventParticipant: event.eventParticipant,
        eventStatus: event.eventStatus,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        __v: event.__v
        // ... add other properties as needed
      }));
    });
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  // Helper function to format time
  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onCardClick(event: Event, index: number) {
    this.isViewEventCompVisible = !this.isViewEventCompVisible;
    if (this.isViewEventCompVisible) {
    this.openViewEventDialog(event, index);

  }
}

  openViewEventDialog(selectedEvent: Event, index: number){
    const dialogRef = this.dialog.open(ViewEventComponent, {
      height: '700px',
      width: '1000px', 
      data: { event: selectedEvent, imagePath: this.imagePaths }   
  });
  dialogRef.afterClosed().subscribe(result => {
      this.isViewEventCompVisible = false;
      // Handle any data or actions after the dialog is closed
    });
}

}