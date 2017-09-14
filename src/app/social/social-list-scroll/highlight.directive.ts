import { Directive, ElementRef, OnInit, Renderer, HostListener } from '@angular/core'

@Directive({
    selector:'[appHighlight]'
})
export class BasicHighlight implements OnInit{
    constructor(private elementRef: ElementRef,
    private renderer:Renderer
    ){

    }
    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

    @HostListener('mouseover') mouseover(eventData:Event){
        this.renderer.setElementStyle(this.elementRef.nativeElement,
        'background-color',
    'blue');
    }

    @HostListener('mouseleave') mouseleave(eventData:Event){
        this.renderer.setElementStyle(this.elementRef.nativeElement,
        'background-color',
    'red');
    }
}
