import { Button, FileInput } from '@apollo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, FileSpreadsheet, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useState } from 'react';

const ACCEPTED_FILE_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const importLeadsFormSchema = z.object({
  file: z
    .instanceof(File, { message: 'Please select a file to import.' })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: 'Invalid file format. Only CSV or Excel files are supported.',
    })
    .nullable()
    .refine((file) => file !== null, {
      message: 'Please select a file to import.',
    }),
});

type ImportLeadsFormValues = z.infer<typeof importLeadsFormSchema>;

export default function ImportLeadsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<ImportLeadsFormValues>({
    resolver: zodResolver(importLeadsFormSchema),
    defaultValues: {
      file: null,
    },
  });

  const handleFileChange = (file: File) => {
    setValue('file', file, { shouldValidate: true });
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setValue('file', null, { shouldValidate: true });
    setSelectedFile(null);
  };

  return (
    <section
      data-testid="import-leads-page"
      className="p-4 space-y-6 flex flex-col flex-1"
    >
      <h2 className="text-2xl font-semibold">Import Leads</h2>
      <form className="flex-1">
        <FileInput
          {...register('file')}
          onFileChange={handleFileChange}
          id="file"
          className="h-full flex flex-col items-center justify-center gap-3 text-center px-4"
          error={errors.file?.message}
        >
          {!selectedFile ? (
            <>
              <CloudUpload className="text-primary w-10 h-10 mx-auto mb-2" />
              <p className="text-primary text-sm font-semibold">
                Select file to import
              </p>
              <p className="text-sm text-muted-foreground">
                Supported formats:{' '}
                <span className="font-medium">CSV, XLS, XLSX</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Your file should include column headers such as:
                <br />
                <span className="font-medium text-foreground">
                  First Name, Last Name, Email, Country, Status
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Make sure all values are properly formatted before uploading.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full">
              <FileSpreadsheet className="text-primary w-10 h-10" />
              <div className="flex flex-col items-center">
                <p className="font-medium text-foreground">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB •{' '}
                  {selectedFile.type.split('/').pop()?.toUpperCase()}
                </p>
              </div>

              <p className="text-xs text-muted-foreground mt-2 max-w-md">
                Great! Your file has been added. You can now proceed to validate
                and import.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button>Validate & Import</Button>
                <Button
                  type="button"
                  onClick={handleRemoveFile}
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove file
                </Button>
              </div>
            </div>
          )}
        </FileInput>
      </form>
    </section>
  );
}
