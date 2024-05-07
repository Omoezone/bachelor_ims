import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {}
  async generatePDF(content: any): Promise<void> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([800, 600]);
    const { width, height } = page.getSize();

    // Define table properties
    const startX = 50;
    const startY = height - 50;
    const cellWidth = 120;
    const cellHeight = 20;
    const fontSize = 12;
    const textMarginX = 5; 
    const textMarginY = 3;

    // Define table data
    const data = content.content.map((item: any) => [
      item.name,
      item.price || 'No value set',
      item.type,
      (item.width && item.height) ? item.width + ' x ' + item.height : 'No dimensions set',
      item.color || 'No color set',
      item.amount
    ]);

    // Draw table headers
    const headers = ['Name', 'Price', 'Type', 'Dimensions', 'Color', 'Amount'];
    for (let i = 0; i < headers.length; i++) {
      page.drawText(headers[i], { 
        x: startX + i * cellWidth + textMarginX, 
        y: startY + textMarginY, 
        size: fontSize,
        color: rgb(0, 0, 0) 
      });
    }

    // Draw table rows
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        page.drawText(String(row[j]), 
        { 
          x: startX + j * cellWidth + textMarginX, 
          y: startY - (i + 2) * cellHeight + textMarginY, 
          size: fontSize 
        });
        page.drawRectangle({
          x: startX + j * cellWidth,
          y: startY - (i + 2) * cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }
}
