import { Component } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Client';
  private hubConnectionBuilder!: HubConnection;
  offers: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('http://localhost:5208/offers')
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() =>
        console.log('Conexão Iniciada!', this.hubConnectionBuilder.connectionId)
      )
      .catch((err) => console.log(err));
    this.hubConnectionBuilder.on('SendOffersToUser', (result: any) => {
      this.offers.push(result);
    });
  }

  getOffers() {
    this.http
      .get(
        `http://localhost:5208/api/ProductOffer/productoffers/${this.hubConnectionBuilder.connectionId}`
      )
      .subscribe();
  }
}
