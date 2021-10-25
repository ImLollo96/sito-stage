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
  arrayChart:any= []; /** array con gli ultimi 10 valori del chart */

  constructor(private webSocket: WebsocketService) { }

  ngOnInit(): void {
    //this.connect();
    //this.connectChart();

/** CHART */
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [
          {
            label: 'DATI',
            data: [0,0,0,0,0,0,0,0,0],
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
      console.log(data);
    });
  }

/** Subscribe a servizio random Chart value */
  connectChart(){
    this.isSubscribeChart = this.webSocket.listen('chart').subscribe((data) => {
      this.updateChart(this.chart, data, 0);
    });
  }

/** Update del Numeber a schermo */
  updateNum(data){
    this.num=data;
  }

/** Update del Chart a schermo */
  updateChart(chart, data, dataSetIndex){
    chart.data.datasets[dataSetIndex].data = data;
    if(this.arrayChart.length<10){
      this.arrayChart.push(data);
    }
    else{
      for(let i=0; i<10;i++){
        let app= this.arrayChart[i+1];
        this.arrayChart[i]=app;
      }
      this.arrayChart[9]=data;
    }
    chart.update();
    console.log('ARRAY CHART',this.arrayChart);
  }

/** Disconnessione dal servizio */
  disconnect(){
    this.webSocket.disconnectSocket();
  }

/** Disconnessione al servizio quando si cambia pagina */
  ngOnDestroy(){
    console.log('DESTROY');
    this.webSocket.disconnectSocket();
    this.isSubscribe.unsubscribe();
    this.isSubscribeChart.unsubscribe();
  }
}
