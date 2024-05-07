import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {}
  async generatePDF(content: any): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const maxRowsPerPage = 20; // Max rows per page

    // Function to create a new page and return it
    const createPage = () => {
      const page = pdfDoc.addPage([800, 600]);
      const { height } = page.getSize();
      return { page, startY: height - 50 };
    };

    // Create the first page
    let { page, startY } = createPage();

    // Table settings
    const startX = 50;
    const cellWidth = 120;
    const cellHeight = 20;
    const fontSize = 12;
    const textMarginX = 5;
    const textMarginY = 3;

    // Headers
    const headers = ['Name', 'Price', 'Type', 'Dimensions', 'Color', 'Amount'];

    // Function to draw headers
    const drawHeaders = (page: any, startY: any) => {
      for (let i = 0; i < headers.length; i++) {
        page.drawText(headers[i], {
          x: startX + i * cellWidth + textMarginX,
          y: startY + textMarginY,
          size: fontSize,
          color: rgb(0, 0, 0)
        });
      }
    };

    // Draw headers on the first page
    drawHeaders(page, startY);

    // Prepare data
    const data = content.content.map((item: any) => [
      item.name,
      item.price || 'No value set',
      item.type,
      (item.width && item.height) ? item.width + ' x ' + item.height : 'No dimensions set',
      item.color || 'No color set',
      item.amount
    ]);

    // Draw rows
    let rowIndex = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      // If max rows reached, create new page and draw headers
      if (i % maxRowsPerPage === 0 && i !== 0) {
        let newPageResults = createPage();
        page = newPageResults.page;
        startY = newPageResults.startY;
        drawHeaders(page, startY);
        rowIndex = 0; // Reset row index for new page
      }

      // Draw the row
      for (let j = 0; j < row.length; j++) {
        page.drawText(String(row[j]), {
          x: startX + j * cellWidth + textMarginX,
          y: startY - (rowIndex + 2) * cellHeight + textMarginY,
          size: fontSize
        });
        page.drawRectangle({
          x: startX + j * cellWidth,
          y: startY - (rowIndex + 2) * cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }
      rowIndex++;
    }

    // Save and open PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }
}
