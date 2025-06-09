import { useRef } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputHeader from '../InputHeader';
import InputFooter from './InputFooter';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface MultiPdfInputComponentProps {
  accept: string[];
  title?: string;
  type: 'pdf';
  value: MultiPdfInput[];
  onChange: (file: MultiPdfInput[]) => void;
}

export interface MultiPdfInput {
  file: File;
  order: number;
}

export default function ToolMultiFileInput({
  value,
  onChange,
  accept,
  title,
  type
}: MultiPdfInputComponentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files)
      onChange([
        ...value,
        ...Array.from(files).map((file) => ({ file, order: value.length }))
      ]);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  function handleClear() {
    onChange([]);
  }

  function fileNameTruncate(fileName: string) {
    const maxLength = 10;
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
    return fileName;
  }

  return (
    <Box>
      <InputHeader
        title={title || 'Input ' + type.charAt(0).toUpperCase() + type.slice(1)}
      />
      <Box
        sx={{
          width: '100%',
          height: '300px',

          border: value?.length ? 0 : 1,
          borderRadius: 2,
          boxShadow: '5',
          bgcolor: 'background.paper',
          position: 'relative'
        }}
      >
        <Box
          width="100%"
          height="100%"
          sx={{
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative'
          }}
        >
          {value?.length ? (
            value.map((file, index) => (
              <Box
                key={index}
                sx={{
                  margin: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '200px',
                  border: 1,
                  borderRadius: 1,
                  padding: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PictureAsPdfIcon />
                  <Typography sx={{ marginLeft: 1 }}>
                    {fileNameTruncate(file.file.name)}
                  </Typography>
                </Box>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    const updatedFiles = value.filter((_, i) => i !== index);
                    onChange(updatedFiles);
                  }}
                >
                  ✖
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No files selected
            </Typography>
          )}
        </Box>
      </Box>

      <InputFooter handleImport={handleImportClick} handleClear={handleClear} />
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        accept={accept.join(',')}
        onChange={handleFileChange}
        multiple={true}
      />
    </Box>
  );
}
