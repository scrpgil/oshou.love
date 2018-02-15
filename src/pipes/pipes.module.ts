import { NgModule } from '@angular/core';
import { ReplaceLineHtmlPipe } from './replace-line-html/replace-line-html';
import { FmtNemDatePipe } from './fmt-nem-date/fmt-nem-date';
import { FmtHexToUtf8Pipe } from './fmt-hex-to-utf8/fmt-hex-to-utf8';
import { OrderByPipe } from './order-by/order-by';
import { NormalizeFontSizePipe } from './normalize-font-size/normalize-font-size';
@NgModule({
	declarations: [
    FmtNemDatePipe,
    ReplaceLineHtmlPipe,
    FmtHexToUtf8Pipe,
    OrderByPipe,
    NormalizeFontSizePipe],
	imports: [],
	exports: [
    FmtNemDatePipe,
    ReplaceLineHtmlPipe,
    FmtHexToUtf8Pipe,
    OrderByPipe,
    NormalizeFontSizePipe]
})
export class PipesModule {}
