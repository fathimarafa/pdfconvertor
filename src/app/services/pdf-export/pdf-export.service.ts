import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

export interface PdfExportSettings {
  title: string;
  tableColumns: any[];
  tableRows: any[];
  autosize?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  defaultColumnWidth: number;
  rowcolor: string;

  constructor() {
    this.defaultColumnWidth = 100;
    this.rowcolor = '#f2f2f2';
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  download(data: PdfExportSettings) {
    const pdfColumnDef = data.tableColumns.filter(e => e.field !== 'action');
    const dataRows = data.tableRows.map((row, index) => {
      const valueArray = pdfColumnDef.map((col) => row[col.field]);
      valueArray[0] = index + 1;
      return valueArray;
    })
    dataRows.unshift(pdfColumnDef.map(e => e.displayName));
    const columnWidths: any = pdfColumnDef.map(e => data.autosize ? 'auto' : this.defaultColumnWidth);
    columnWidths[0] = 30; // S.No column
    let docDefinition = {
      content: [
        { text: `List of ${data.title}`, style: 'subheader' },
        {
          layout: {
            fillColor: (rowIndex) => {
              return (rowIndex % 2 === 0) ? this.rowcolor : null;
            }
          },
          fontSize: 10,
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: dataRows
          }
        }
      ],
      styles: {
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(docDefinition).download(`List of ${data.title}`);
  }


}
