export class Content{
    private temperatura: string = '0';
    private luz: string ='0';
    private sendoTocado: boolean = false;
    private botaoPressionado: number = 0;
    private status: string = '';
    private buzzer: number = 0;

    constructor(temperatura:string, luz: string, sendoTocado: boolean, botaoPresionado: number, status: string){
        this.temperatura=temperatura;
        this.luz=luz;
        this.botaoPressionado=botaoPresionado;
        this.sendoTocado=sendoTocado;
        this.status=status;
    }

    public getTemperatura():string{
        return this.temperatura;
    }
    public setTemperatura(temperatura:string){
        this.temperatura = temperatura;
    }
    public getLuz():string{
        return this.luz;
    }
    public setLuz(luz:string){
        this.luz = luz;
    }
    public getSendoTocado():boolean{
        return this.sendoTocado;
    }
    public setSendoTocado(sendoTocado:boolean){
        this.sendoTocado = sendoTocado;
    }
    public getBotaoPressionado():number{
        return this.botaoPressionado;
    }
    public setBotaoPressionado(botaoPressionado:number){
        this.botaoPressionado = botaoPressionado;
    }
    public getStatus():string{
        return this.status;
    }
    public setStatus(status:string){
        this.status = status;
    }
}