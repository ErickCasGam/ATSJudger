"use client";

import { extractPDFText } from "@/lib/extractPDFText";

type UploadButtonProps = {
  onUpload: (
    text: string,
    fileName: string
  ) => void;
};

export default function UploadButton({
  onUpload,
}: UploadButtonProps) {
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // ONLY PDF
    if (
      file.type !== "application/pdf"
    ) {
      alert(
        "Only emotional damage PDFs supported."
      );

      return;
    }

    try {
      const text =
        await extractPDFText(file);

      onUpload(text, file.name);

      console.log(text);
    } catch (error) {
      console.error(error);

      alert(
        "Your CV corrupted the machine."
      );
    }
  };

  return (
    <label
      className="
        mt-2
        border
        border-red-500
        bg-black/60
        px-12
        py-6
        text-xl
        md:text-2xl
        tracking-[0.3em]
        uppercase
        hover:bg-red-500
        hover:text-black
        transition-all
        duration-300
        shadow-[0_0_20px_rgba(255,0,0,0.35)]
        hover:shadow-[0_0_50px_red]
        backdrop-blur-sm
        font-bolder
        cursor-pointer
        text-center
        block
      "
    >
      Upload Your Trashy CV
      <br />

      <span className="text-sm tracking-[0.4em]">
        And Await Your Fate
      </span>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
}