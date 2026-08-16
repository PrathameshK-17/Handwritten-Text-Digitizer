import jsPDF from 'jspdf';

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export type DownloadFormat = 'pdf' | 'docx' | 'txt';

/**
 * Download text content as a TXT file
 */
export function downloadAsTxt(text: string, filename: string = 'ai-corrected-text') {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${filename}.txt`);
}

/**
 * Download text content as a PDF file
 */
export async function downloadAsPdf(text: string, filename: string = 'ai-corrected-text') {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Add title
    pdf.setFontSize(18);
    pdf.setTextColor(79, 70, 229); // Indigo color
    pdf.text('ML Corrected Document', margin, margin);

    // Add timestamp
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, margin + 8);

    // Add horizontal line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, margin + 12, pageWidth - margin, margin + 12);

    // Add content
    pdf.setFontSize(12);
    pdf.setTextColor(30, 30, 30);

    const lines = pdf.splitTextToSize(text, maxWidth);
    let yPosition = margin + 20;
    const lineHeight = 6;

    for (let i = 0; i < lines.length; i++) {
        if (yPosition + lineHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
    }

    // Add footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
            `Page ${i} of ${totalPages} | Pen2text-using-Deep-Learning`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
        );
    }

    pdf.save(`${filename}.pdf`);
}

/**
 * Download text content as a Word document
 */
export async function downloadAsDocx(text: string, filename: string = 'ai-corrected-text') {
    const lines = text.split('\n');

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: "ML Predicted Document",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Generated on: ${new Date().toLocaleString()}`,
                            italics: true,
                            color: "666666"
                        })
                    ],
                    spacing: { after: 400 }
                }),
                ...lines.map(line => new Paragraph({
                    children: [new TextRun(line)],
                    spacing: { after: 120 }
                }))
            ],
        }],
    });

    try {
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${filename}.docx`);
    } catch (error) {
        console.error('Error generating DOCX:', error);
    }
}

/**
 * Download content as a PNG image
 */


/**
 * Main download function that handles all formats
 */
export async function downloadContent(
    format: DownloadFormat,
    text: string,
    elementId?: string,
    filename: string = 'ai-corrected-text'
) {
    switch (format) {
        case 'pdf':
            await downloadAsPdf(text, filename);
            break;
        case 'docx':
            await downloadAsDocx(text, filename);
            break;

        case 'txt':
            downloadAsTxt(text, filename);
            break;
        default:
            console.error('Unsupported format:', format);
    }
}
