export async function extractPDFText(
  file: File
) {
  const pdfjsLib = await import(
    "pdfjs-dist/legacy/build/pdf.mjs"
  );

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "/pdf.worker.min.mjs";

  const arrayBuffer =
    await file.arrayBuffer();

  const pdf =
    await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

  let text = "";

  for (
    let pageNum = 1;
    pageNum <= pdf.numPages;
    pageNum++
  ) {
    const page =
      await pdf.getPage(pageNum);

    const content =
      await page.getTextContent();

    const strings = content.items.map(
      (item: any) => item.str
    );

    text += strings.join(" ");
  }

  return text;
}