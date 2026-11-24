import PDFDocument from 'pdfkit';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType
} from 'docx';

export function generatePDFDocument(project) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
        info: {
          Title: `${project.title} - System Documentation`,
          Author: 'CodeMind AI',
          Subject: 'Autonomous Software Generation Specification'
        }
      });

      const buffers = [];
      doc.on('data', (data) => buffers.push(data));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Cover Page
      doc.rect(0, 0, 595.28, 841.89).fill('#0f172a'); // slate-900 background

      doc.fillColor('#6366f1').fontSize(28).font('Helvetica-Bold').text('CODEMIND AI', 50, 120);
      doc.fillColor('#94a3b8').fontSize(12).font('Helvetica').text('Autonomous Software Specification & Architecture Document', 50, 155);

      doc.fillColor('#ffffff').fontSize(26).font('Helvetica-Bold').text(project.title, 50, 240);

      doc.fillColor('#cbd5e1').fontSize(11).font('Helvetica').text(
        `Original Prompt: "${project.prompt}"`,
        50,
        290,
        { width: 495, lineGap: 4 }
      );

      // Tech Stack Box
      doc.rect(50, 370, 495, 120).fillAndStroke('#1e293b', '#334155');
      doc.fillColor('#818cf8').fontSize(12).font('Helvetica-Bold').text('CONFIRMED TECH STACK', 65, 385);
      doc.fillColor('#e2e8f0').fontSize(10).font('Helvetica').text(
        `• Frontend:  ${project.techStack?.frontend || 'React'}\n` +
        `• Backend:   ${project.techStack?.backend || 'Node.js / Express'}\n` +
        `• Database:  ${project.techStack?.database || 'MongoDB'}\n` +
        `• Security:  ${project.techStack?.auth || 'JWT + bcrypt'}\n` +
        `• Styling:   ${project.techStack?.styling || 'Tailwind CSS'}`,
        65,
        410,
        { lineGap: 3 }
      );

      doc.fillColor('#64748b').fontSize(10).text(
        `Generated: ${new Date().toLocaleDateString()} • CodeMind AI Platform v1.0`,
        50,
        750
      );

      // Section 1: Requirements Analysis
      doc.addPage({ margin: 50 });
      doc.fillColor('#0f172a');

      doc.fillColor('#4338ca').fontSize(18).font('Helvetica-Bold').text('1. Requirements Analysis');
      doc.moveDown(0.5);

      const req = project.requirementsAnalysis;
      doc.fillColor('#334155').fontSize(10).font('Helvetica').text(req?.overview || 'Comprehensive system analysis.');
      doc.moveDown();

      doc.fillColor('#1e293b').fontSize(13).font('Helvetica-Bold').text('Target User Roles:');
      doc.moveDown(0.3);
      req?.targetUsers?.forEach((u) => {
        doc.fillColor('#4338ca').fontSize(11).font('Helvetica-Bold').text(`• Role: ${u.role}`);
        doc.fillColor('#334155').fontSize(9).font('Helvetica').text(`  Capabilities: ${u.capabilities?.join(', ')}`);
        doc.moveDown(0.2);
      });

      doc.moveDown();
      doc.fillColor('#1e293b').fontSize(13).font('Helvetica-Bold').text('Functional Modules:');
      doc.moveDown(0.3);
      req?.modules?.forEach((m) => {
        doc.fillColor('#1e293b').fontSize(10).font('Helvetica-Bold').text(`Module: ${m.name}`);
        m.features?.forEach((f) => {
          doc.fillColor('#475569').fontSize(9).font('Helvetica').text(`  - ${f}`);
        });
        doc.moveDown(0.2);
      });

      // Section 2: System Architecture
      doc.addPage({ margin: 50 });
      doc.fillColor('#4338ca').fontSize(18).font('Helvetica-Bold').text('2. System Architecture & Design');
      doc.moveDown(0.5);

      const arch = project.architecture;
      doc.fillColor('#1e293b').fontSize(12).font('Helvetica-Bold').text(`Architectural Pattern: ${arch?.pattern || '3-Tier Architecture'}`);
      doc.fillColor('#334155').fontSize(10).font('Helvetica').text(arch?.description || '');
      doc.moveDown();

      doc.fillColor('#1e293b').fontSize(12).font('Helvetica-Bold').text('System Components:');
      arch?.components?.forEach((c) => {
        doc.fillColor('#4338ca').fontSize(10).font('Helvetica-Bold').text(`• ${c.name} (${c.technology})`);
        doc.fillColor('#475569').fontSize(9).font('Helvetica').text(`  ${c.role}`);
        doc.moveDown(0.2);
      });

      if (arch?.diagram) {
        doc.moveDown();
        doc.fillColor('#1e293b').fontSize(11).font('Helvetica-Bold').text('Architecture Diagram:');
        doc.font('Courier').fontSize(7.5).fillColor('#334155').text(arch.diagram);
      }

      // Section 3: Database Schema
      doc.addPage({ margin: 50 });
      doc.fillColor('#4338ca').fontSize(18).font('Helvetica-Bold').text('3. Database Schema Specification');
      doc.moveDown(0.5);

      const schema = project.schemaDesign;
      schema?.collections?.forEach((c) => {
        doc.fillColor('#1e293b').fontSize(12).font('Helvetica-Bold').text(`Entity / Collection: ${c.name}`);
        c.fields?.forEach((f) => {
          doc.fillColor('#334155').fontSize(9).font('Helvetica').text(
            `  • ${f.name.padEnd(16, ' ')} : ${f.type.padEnd(24, ' ')} ${f.required ? '[Required]' : ''}`
          );
        });
        doc.moveDown(0.4);
      });

      // Section 4: API Endpoints
      doc.addPage({ margin: 50 });
      doc.fillColor('#4338ca').fontSize(18).font('Helvetica-Bold').text('4. REST API Endpoint Reference');
      doc.moveDown(0.5);

      project.apiEndpoints?.forEach((a) => {
        doc.fillColor('#4338ca').fontSize(10).font('Helvetica-Bold').text(`${a.method}  ${a.path}`);
        doc.fillColor('#64748b').fontSize(8.5).font('Helvetica').text(`Auth: ${a.auth}  |  ${a.description}`);
        doc.fillColor('#334155').fontSize(8).font('Courier').text(`Request: ${a.request}`);
        doc.moveDown(0.3);
      });

      // Section 5: Setup & Execution Instructions
      doc.addPage({ margin: 50 });
      doc.fillColor('#4338ca').fontSize(18).font('Helvetica-Bold').text('5. Setup & Local Run Instructions');
      doc.moveDown(0.5);

      const setup = project.setupGuide;
      doc.fillColor('#1e293b').fontSize(11).font('Helvetica-Bold').text('Prerequisites:');
      setup?.prerequisites?.forEach((p) => {
        doc.fillColor('#475569').fontSize(9).font('Helvetica').text(`- ${p}`);
      });
      doc.moveDown();

      doc.fillColor('#1e293b').fontSize(11).font('Helvetica-Bold').text('Step-by-Step Instructions:');
      setup?.steps?.forEach((s, idx) => {
        doc.fillColor('#4338ca').fontSize(10).font('Helvetica-Bold').text(`${idx + 1}. ${s.title}`);
        doc.fillColor('#334155').fontSize(9).font('Courier').text(`   $ ${s.command}`);
        doc.moveDown(0.2);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export async function generateDOCXDocument(project) {
  const req = project.requirementsAnalysis;
  const arch = project.architecture;
  const schema = project.schemaDesign;
  const apis = project.apiEndpoints;
  const setup = project.setupGuide;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: project.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Generated by CodeMind AI • Complete System Specification",
                italics: true,
                color: "666666"
              })
            ],
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({ text: "" }),

          // Overview
          new Paragraph({
            text: "1. Project Requirements & Analysis",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "User Requirement Prompt: ", bold: true }),
              new TextRun({ text: `"${project.prompt}"` })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            text: req?.overview || "Overview of project requirements."
          }),
          new Paragraph({ text: "" }),

          // Tech Stack Table
          new Paragraph({
            text: "Confirmed Technology Stack",
            heading: HeadingLevel.HEADING_2
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Layer", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Technology Selected", bold: true })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Frontend UI")] }),
                  new TableCell({ children: [new Paragraph(project.techStack?.frontend || "React")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Backend Server")] }),
                  new TableCell({ children: [new Paragraph(project.techStack?.backend || "Node.js / Express")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Database Persistence")] }),
                  new TableCell({ children: [new Paragraph(project.techStack?.database || "MongoDB")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Authentication & Security")] }),
                  new TableCell({ children: [new Paragraph(project.techStack?.auth || "JWT + bcrypt")] })
                ]
              })
            ]
          }),
          new Paragraph({ text: "" }),

          // Architecture
          new Paragraph({
            text: "2. System Architecture",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Architectural Pattern: ", bold: true }),
              new TextRun({ text: arch?.pattern || "3-Tier Architecture" })
            ]
          }),
          new Paragraph({ text: arch?.description || "" }),
          new Paragraph({ text: "" }),

          // Database Schema
          new Paragraph({
            text: "3. Database Schema",
            heading: HeadingLevel.HEADING_1
          }),
          ...(schema?.collections?.flatMap((c) => [
            new Paragraph({ text: `Entity: ${c.name}`, heading: HeadingLevel.HEADING_2 }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Field", bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Type", bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })] })
                  ]
                }),
                ...(c.fields?.map(
                  (f) =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph(String(f.name || 'field'))] }),
                        new TableCell({ children: [new Paragraph(String(f.type || 'String'))] }),
                        new TableCell({ children: [new Paragraph(String(f.description || (f.required ? "Required" : "Optional")))] })
                      ]
                    })
                ) || [])
              ]
            }),
            new Paragraph({ text: "" })
          ]) || []),

          // API Reference
          new Paragraph({
            text: "4. API Endpoints Specification",
            heading: HeadingLevel.HEADING_1
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Method", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Endpoint", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Auth", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })] })
                ]
              }),
              ...(apis?.map(
                (a) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(String(a.method || 'GET'))] }),
                      new TableCell({ children: [new Paragraph(String(a.path || '/api'))] }),
                      new TableCell({ children: [new Paragraph(String(a.auth || 'Public'))] }),
                      new TableCell({ children: [new Paragraph(String(a.description || 'API route'))] })
                    ]
                  })
              ) || [])
            ]
          }),
          new Paragraph({ text: "" }),

          // Setup
          new Paragraph({
            text: "5. Setup & Local Run Instructions",
            heading: HeadingLevel.HEADING_1
          }),
          ...(setup?.steps?.map(
            (s, idx) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${idx + 1}. ${s.title || 'Step'}: `, bold: true }),
                  new TextRun({ text: String(s.command || ''), font: "Courier New" })
                ]
              })
          ) || [])
        ]
      }
    ]
  });

  return await Packer.toBuffer(doc);
}
