import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {

  num:any=0;  /** numero mostrato a schermo */
  isSubscribe! : Subscription;  /** subscription del num */
  isSubscribeChart! : Subscription; /** subscription del chart */
  chart:any = []; /** chart mostrato a schermo */
  onNum = false;
  onChart = false;

  constructor(private webSocket: WebsocketService) { }

  ngOnInit(): void {
    //this.connect();
    //this.connectChart();

/** CHART */
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8','9','10'],
        datasets: [
          {
            label: 'DATI',
            data: [],
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
          }
        ]
      }
    });
  }

/** Subscribe a servizio random Number */
  connect(){
    this.isSubscribe = this.webSocket.listen('random').subscribe((data) => {
      this.updateNum(data);
    });
    this.onNum = true;
  }

/** Subscribe a servizio random Chart value */
  connectChart(){
    this.isSubscribeChart = this.webSocket.listen('chart').subscribe((data) => {
      this.updateChart(this.chart, data, 0);
    });
    this.onChart = true;
  }

/** Update del Numeber a schermo */
  updateNum(data){
    this.num=data;
  }

/** Update del Chart a schermo */
  updateChart(chart, data, dataSetIndex){
    let dato = parseInt(data,0)
    
    if(chart.data.datasets[dataSetIndex].data.length<10){
      chart.data.datasets[dataSetIndex].data.push(dato);
    }
    else{
      for(let i=0; i<10;i++){
        let app= chart.data.datasets[dataSetIndex].data[i+1];
        chart.data.datasets[dataSetIndex].data[i]=app;
      }
      chart.data.datasets[dataSetIndex].data[9]=dato;
    }

    chart.update();
    console.log('ARRAY CHART',chart.data.datasets[dataSetIndex].data);
  }

/** Disconnessione dal servizio */
  disconnect(){
    this.webSocket.disconnectSocket();
    this.onNum = false;
    this.onChart = false;
  }

/** Disconnessione al servizio quando si cambia pagina */
  ngOnDestroy(){
    if(this.isSubscribe != undefined || this.isSubscribeChart != undefined){
      console.log('DESTROY');
      this.webSocket.disconnectSocket();  /** si disconnete dal socket */
      if(this.isSubscribe != undefined){
        this.isSubscribe.unsubscribe(); /** si disiscrive dal servizio */
      }
      if(this.isSubscribeChart != undefined){
        this.isSubscribeChart.unsubscribe();  /** si disiscrive dal servizio  */
      }
    }else{
      console.log('NO');
    }
    this.onNum = false;
    this.onChart = false;
  }
}
