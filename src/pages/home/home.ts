import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import nem from "nem-sdk";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    test:boolean = false;
    endpoint:any;
    ding:any;
    ding2:any;
    oshou:string;
    oshou_initial:string="<br> 　　　　＿__＿_ <br> 　　 ,;f　　　　　ヽ <br> 　　i:　　 　　 　　 i <br> 　　|　　　 　　　 　| 　<br> 　　|　　　　　　　　|　　///;ﾄ,　　 <br> 　　|　　　　^　　^　)　////ﾞlﾞl;　 <br> 　　(.　　>ﾉ(､_, )ヽ､} l 　 .i .! |　　 <br> 　 ,,∧ヽ　!-=ﾆ=- | │　 　| .| 　   <br> ／＼..＼＼｀ﾆﾆ´ !,　{　　 .ﾉ.ﾉ　　 <br> ／　 ＼ ＼￣￣￣../　　 / .| <br>";
    oshou_unconfirm:string = "<br>　　　　＿__＿_ <br> 　　 ,;f　　　　　ヽ <br> 　　i:　　 　　 　　 i  <br> 　　|　　　 　　　 　|  ！！！！！<br> 　　|　　　　　　　　|　　///;ﾄ,　　 <br> 　　|　　　　^　　^　)　////ﾞlﾞl;　 <br> 　　(.　　>ﾉ(､_, )ヽ､} l 　 .i .! |　　 <br> 　 ,,∧ヽ　!-=ﾆ=- | │　 　| .| 　   <br> ／＼..＼＼｀ﾆﾆ´ !,　{　　 .ﾉ.ﾉ　　 <br> ／　 ＼ ＼￣￣￣../　　 / .| <br>";
    oshou_confirm:string="<br> 　　　　＿__＿_ <br> 　　 ,;f　　　　　ヽ <br> 　　i:　　 　　 　　 i   <br> 　　|　　　 　　　 　|  　ありがたやありがたや<br> 　　|　　　　　　　　|　　///;ﾄ,　　 <br> 　　|　　　　^　　^　)　////ﾞlﾞl;　 <br> 　　(.　　>ﾉ(､_, )ヽ､} l 　 .i .! |　　 <br> 　 ,,∧ヽ　!-=ﾆ=- | │　 　| .| 　   <br> ／＼..＼＼｀ﾆﾆ´ !,　{　　 .ﾉ.ﾉ　　 <br> ／　 ＼ ＼￣￣￣../　　 / .| <br>";

    timer:any;
    confirmed:any = [];
    unconfirmed:any = [];
    address:string = "";
    NODES = ["http://alice2.nem.ninja", "http://alice3.nem.ninja", "http://alice4.nem.ninja", "http://alice5.nem.ninja", "http://alice6.nem.ninja", "http://alice7.nem.ninja"];

    constructor(public toastCtrl: ToastController, public navCtrl: NavController) {
        this.ding = new Audio("assets/audio/ding.ogg");
        this.ding2 = new Audio("assets/audio/ding2.ogg");
        this.oshou = this.oshou_initial;
    }
    ionViewDidLoad(){
        if(this.test == true){
            // Testnet用
            this.address = "TCN57YPS6XUDWPY6GEMMIF6MEHNTPXKNKWYLVA7O";
            this.endpoint = nem.model.objects.create("endpoint")("http://153.122.112.137", nem.model.nodes.websocketPort);
        }else{
            // Mainnet用
            this.address = "NA5R5WLTSUYA7W5HPQLDIJGFXHLDUB5MMENVYPX5";
            let ip = this.NODES[Math.floor(Math.random() * this.NODES.length)];
            this.endpoint = nem.model.objects.create("endpoint")(ip, nem.model.nodes.websocketPort);
        }
        var connector = nem.com.websockets.connector.create(this.endpoint, this.address);
        connector.connect().then(()=> {
            console.log("Connected");

            nem.com.websockets.subscribe.account.transactions.recent(connector, (res)=> {
                this.confirmed = res.data;
                console.log(this.confirmed);
            });

            nem.com.websockets.subscribe.account.transactions.unconfirmed(connector, (res)=> {
                let flg = false;
                for(let j=0;j<this.unconfirmed.length;j++){
                    if(res.meta.hash.data==this.unconfirmed[j].meta.hash.data){
                        flg=true;
                    }
                }
                if(flg==false){
                    this.unconfirmed = this.unconfirmed.concat(res);
                    this.ding.play();
                    this.oshou = this.oshou_unconfirm;
                    this.clearInitialOshou();
                    this.setInitialOshou();
                    console.log(res);
                }
            });

            nem.com.websockets.subscribe.account.transactions.confirmed(connector, (res)=> {
                this.ding2.play();
                this.oshou = this.oshou_confirm;
                this.clearInitialOshou();
                this.setInitialOshou();
                console.log(res);
                let delIdx = -1;
                for(let i=0;i<this.unconfirmed.length;i++){
                    if(res.meta.hash.data==this.unconfirmed[i].meta.hash.data){
                        delIdx=i;
                    }
                }
                if(0 <= delIdx){
                    this.unconfirmed.splice(delIdx, 1);
                }
                this.confirmed = this.confirmed.concat(res);
            });

            nem.com.websockets.subscribe.account.data(connector, (res)=> {
                console.log(res);
            });

            nem.com.websockets.requests.account.data(connector);
            nem.com.websockets.requests.account.transactions.recent(connector);
        },

        err => {
            console.error(err);
        });
    }

    setInitialOshou(){
        this.timer = setTimeout(()=>{
            this.oshou = this.oshou_initial;
        }, 10000);
    }
    clearInitialOshou(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }
    copy(){
        var temp = document.createElement('div');
        temp.appendChild(document.createElement('pre')).textContent = this.address;
        var s = temp.style;
        s.position = 'fixed';
        s.left = '-100%';
        document.body.appendChild(temp);
        document.getSelection().selectAllChildren(temp);
        var result = document.execCommand('copy');
        document.body.removeChild(temp);
        let toast = this.toastCtrl.create({
            message: 'コピーしました',
            duration: 300,
            position: 'bottom'
        });
        toast.present();
    }
}
