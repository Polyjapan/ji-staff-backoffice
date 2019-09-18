import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-online-event-test',
  template: `<p>Data : {{testData}}</p><p>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur nulla eu ultricies consectetur. Fusce nec metus in odio
      porttitor eleifend. In hac habitasse platea dictumst. Integer vel commodo lacus. Nam tempor, dui ac tristique commodo, velit ipsum
      dignissim ipsum, non rhoncus elit neque condimentum tellus. Nullam ligula justo, maximus ut aliquam sed, lobortis id lectus. Nulla
      pellentesque, diam eu tincidunt iaculis, erat elit ultrices mauris, eu rhoncus risus neque sed lacus. Vestibulum sollicitudin nunc eu
      laoreet vulputate. Cras elementum vel sapien maximus faucibus. Morbi ac odio aliquet, facilisis tellus a, eleifend magna. Mauris porta
      ligula a arcu vehicula posuere vel a enim. Aenean ut odio varius, dictum est in, vestibulum elit. In sollicitudin sagittis aliquet.
      Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec fermentum interdum
      ante, eu pulvinar tellus scelerisque id.

      Vestibulum luctus rhoncus mauris ac iaculis. Nulla facilisi. Maecenas id ultrices libero. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Integer nulla augue, elementum blandit consequat non, volutpat eget neque. Ut ex ante,
      aliquet sit amet pellentesque id, tristique vel enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper
      condimentum erat, ut suscipit mi malesuada sit amet. In facilisis velit sed egestas vulputate.

      Donec nec magna sed sem semper auctor id non nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque et lorem
      at nulla hendrerit euismod. Aenean vel augue sit amet urna auctor commodo. Pellentesque arcu tortor, imperdiet vel semper ac, feugiat
      quis sapien. Praesent a ex nec purus aliquam venenatis eget quis nibh. Aenean sodales ligula fermentum ante dapibus, non tempus lacus
      congue.

      In ac vulputate arcu. Duis eget iaculis orci, vel tincidunt est. Nulla sit amet dui eu ante maximus auctor. Sed a volutpat tortor.
      Donec id rhoncus quam. Ut a maximus leo. Sed varius sem varius ex accumsan, sodales tristique nibh tincidunt. Phasellus eleifend id
      leo nec aliquam.

      Aenean sed pulvinar purus, non maximus nisl. Nullam dignissim sit amet nisl ut dictum. Nam dictum porttitor tortor sit amet
      vestibulum. Quisque at pharetra odio. Curabitur dictum semper nibh, fringilla varius tortor commodo vel. Proin ut consequat est. In
      hac habitasse platea dictumst. Vestibulum eu lacinia arcu, at pharetra nunc. Sed quis volutpat nulla, sit amet vulputate est.

      Vivamus ornare massa sed mattis hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames
      ac ante ipsum primis in faucibus. Etiam rhoncus dui neque, at sagittis quam auctor a. Morbi libero elit, luctus in nulla in, elementum
      congue ex. Praesent magna sem, sodales id metus at, cursus semper mi. Nulla tellus augue, mattis eget augue a, consequat consectetur
      est.

      Mauris id risus ac ante mollis fermentum sit amet eget turpis. Quisque congue vestibulum velit ut laoreet. Mauris interdum leo eros,
      id pulvinar quam ultricies non. Nam eu varius erat. Vivamus auctor sem ut dui convallis, quis imperdiet metus scelerisque. Donec
      semper sit amet turpis eu commodo. Praesent a nibh a eros aliquam faucibus vel eget nulla. Pellentesque pretium accumsan mi, a sodales
      mauris venenatis vel. Duis lacinia vestibulum diam, quis porttitor lectus malesuada vel. Aliquam at pharetra augue. Curabitur vitae
      eros sed urna sodales volutpat vitae id risus.

      Phasellus auctor, velit in molestie aliquet, magna nisi finibus ligula, a elementum libero neque vitae risus. Praesent ultrices eget
      leo id imperdiet. Nam lobortis felis sit amet dui condimentum commodo. Ut nisl purus, ultricies vitae orci vitae, finibus porta dolor.
      Morbi sed massa sit amet justo porta porta. Nunc in neque sed turpis pulvinar facilisis eget eu felis. Sed varius euismod porta.

      Nunc eros neque, ultrices a turpis accumsan, ultricies efficitur lorem. Donec felis justo, auctor porttitor rhoncus id, porta quis
      nibh. Aliquam erat volutpat. Fusce volutpat ac nunc ut viverra. In lacus tortor, fermentum in blandit posuere, ullamcorper sed nibh.
      Praesent at eros rutrum, fringilla est at, commodo purus. Sed semper aliquam tempor. Curabitur at ante justo. Vivamus a mauris
      euismod, consectetur massa sit amet, varius erat. Ut nec dui faucibus, mollis est sit amet, rhoncus augue. Nunc tempor nulla in magna
      iaculis pharetra. Nullam malesuada lacinia placerat. Curabitur blandit lectus ac elit faucibus, in dapibus lectus cursus.

      Etiam elit magna, pharetra sed urna vel, molestie fermentum dolor. Fusce consequat quam in orci hendrerit sollicitudin. Cras
      pellentesque libero non metus pulvinar, quis egestas elit viverra. Nulla mauris nunc, hendrerit nec posuere a, accumsan sit amet
      augue. Nullam molestie ipsum condimentum ligula tempor sodales. Mauris vehicula aliquet sapien et placerat. Morbi sed lobortis ex.
      Morbi non eros eget erat iaculis scelerisque. Curabitur sit amet dui nec sem eleifend viverra. Curabitur sed lorem eu risus suscipit
      fermentum. Aenean gravida lorem purus, quis ultricies neque finibus nec.

      Pellentesque viverra sed nibh sit amet aliquam. In egestas dolor vel bibendum pretium. Proin imperdiet et magna a malesuada. Donec vel
      vulputate erat, a maximus elit. Donec faucibus metus eu ante faucibus blandit. Maecenas tortor ante, faucibus dictum ante nec, lacinia
      tempus dolor. Nam augue augue, vulputate vitae convallis ac, consequat lacinia magna. In aliquam ante vel nulla sollicitudin, id
      pretium sapien scelerisque. Praesent ante sapien, bibendum hendrerit ex eu, pellentesque commodo leo. Sed tempus vitae felis non
      facilisis. Quisque lectus nulla, mattis sit amet tincidunt sed, egestas nec dolor. Donec hendrerit laoreet mauris et rutrum. Aenean
      elementum eget ex ut egestas. Ut eget eros aliquam, imperdiet purus et, luctus lectus. Nulla eros nibh, sagittis et pulvinar in,
      hendrerit at massa. Morbi molestie non tortor sed tincidunt.

      Curabitur sollicitudin erat ex, sit amet imperdiet ante vestibulum eget. Etiam quis commodo nulla. Nunc accumsan felis ut mi pretium,
      ac facilisis lectus ultricies. Suspendisse vitae aliquet tortor. Proin sit amet finibus risus. Curabitur tincidunt lacus nec arcu
      hendrerit volutpat. Nullam vitae tellus lacus. Morbi tincidunt augue ac arcu ornare feugiat. Cras volutpat arcu augue, ac fringilla
      nibh imperdiet quis. Suspendisse potenti. Vivamus vitae dolor augue. Sed ut sapien vehicula, dapibus nisi eget, tempor elit. Cras nunc
      odio, mattis vitae mollis dapibus, fermentum ac tortor. Aliquam id luctus libero, eget dapibus odio.

      Proin nisi enim, gravida nec rhoncus eget, scelerisque sed quam. Praesent vel tristique justo. Cras vel congue arcu, nec mollis dolor.
      Mauris gravida elit in fringilla pellentesque. Nunc sit amet commodo lacus. Phasellus sed mollis est. Nunc malesuada id ante id
      venenatis. Proin quis risus nisi. Aliquam tristique sagittis luctus. Sed augue purus, aliquam ac malesuada vitae, porta eu erat. Proin
      rutrum, ligula eu rhoncus iaculis, elit erat sagittis arcu, vitae posuere massa nulla eget diam. Sed nec vehicula augue, eu porta
      nunc. Phasellus bibendum sit amet elit nec faucibus. Quisque eget suscipit purus. Mauris volutpat diam et vehicula ultricies. Vivamus
      vel posuere velit, quis dignissim mi.

      Etiam bibendum ullamcorper nisl vitae ultricies. Sed fermentum sem aliquet nibh lobortis, quis posuere urna interdum. Vestibulum
      vulputate et nibh non posuere. Sed vitae fringilla arcu. Morbi tempor dolor sit amet odio finibus, sit amet interdum odio rutrum.
      Fusce fringilla sed elit vel mollis. Etiam vitae porttitor turpis. In eu hendrerit ipsum. Cras vitae orci eros. Aliquam viverra mauris
      in enim ornare, vel tristique dui pulvinar. Nunc sed tortor tincidunt, fermentum nisl condimentum, commodo lacus.

      Morbi fringilla lectus neque, id porta metus efficitur sed. In nec orci id turpis tristique malesuada. Orci varius natoque penatibus
      et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus est et nisl ultrices, quis tempus est imperdiet. Proin ac leo
      vel elit laoreet tristique. Fusce eleifend aliquet tincidunt. Suspendisse potenti. Nunc metus ante, mattis non cursus eget, accumsan
      sit amet elit. Sed ultrices lorem porttitor orci dignissim sollicitudin. Mauris varius, tellus ac ultrices tincidunt, mi risus
      vulputate turpis, eu laoreet mauris nisl vel magna. Nullam nunc lacus, luctus vel viverra eu, feugiat in eros.</p>`
})
export class TestComponent implements OnInit {
  testData: string;

  constructor(private ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ar.data.subscribe(data => this.testData = 'ID ' + data.eventId);
  }

}
