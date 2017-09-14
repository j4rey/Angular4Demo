import { Directive, HostListener, OnInit, ElementRef, Renderer, EventEmitter } from "@angular/core";

@Directive({
selector : '[scroller]',
outputs:['everySecond']
})
export class ScrollLoad implements OnInit{
    everySecond = new EventEmitter<{count:number}>();

    constructor(private elRef: ElementRef,private renderer: Renderer){}

    //counter = 0;

    ngOnInit(): void {
        console.log('directive loaded');
        // setInterval(() =>
        // {
        //      this.everySecond.emit({count:this.counter});
        //      this.counter++;
        // }, 1000);
        
    }

    @HostListener('mouseover') mouseover(eventData:Event){
        //this.elRef.nativeElement.scrollTop = 460;
        //this.everySecond.emit("event");
    }

    @HostListener('scroll', ['$event']) 
    onWindowScroll($event: UIEvent) {
        //console.log(this.elRef.nativeElement);
        //console.log("offsetTop:"+this.elRef.nativeElement.offsetTop);
        //console.log("scrollTop:"+this.elRef.nativeElement.scrollTop);
        //console.log("scrollTopMax:"+this.elRef.nativeElement.scrollTopMax);
        
        if(this.elRef.nativeElement.scrollTop/this.elRef.nativeElement.scrollTopMax > 0.8){
            this.everySecond.emit({count:1});
        }
        //console.log($event);
    }
}