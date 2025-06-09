import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import ToolFileResult from '@components/result/ToolFileResult';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { debounce } from 'lodash';
import ToolVideoInput from '@components/input/ToolVideoInput';
import { compressVideo, VideoResolution } from './service';
import SimpleRadio from '@components/options/SimpleRadio';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const initialValues = {
  width: 480 as VideoResolution,
  crf: 23,
  preset: 'medium'
};

export const validationSchema = Yup.object({
  width: Yup.number()
    .oneOf(
      [240, 360, 480, 720, 1080],
      'Width must be one of the standard resolutions'
    )
    .required('Width is required'),
  crf: Yup.number()
    .min(0, 'CRF must be at least 0')
    .max(51, 'CRF must be at most 51')
    .required('CRF is required'),
  preset: Yup.string()
    .oneOf(
      [
        'ultrafast',
        'superfast',
        'veryfast',
        'faster',
        'fast',
        'medium',
        'slow',
        'slower',
        'veryslow'
      ],
      'Preset must be a valid ffmpeg preset'
    )
    .required('Preset is required')
});

const resolutionOptions: { value: VideoResolution; label: string }[] = [
  { value: 240, label: '240p' },
  { value: 360, label: '360p' },
  { value: 480, label: '480p' },
  { value: 720, label: '720p' },
  { value: 1080, label: '1080p' }
];

export default function CompressVideo({ title }: ToolComponentProps) {
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const compute = async (
    optionsValues: typeof initialValues,
    input: File | null
  ) => {
    if (!input) return;
    setLoading(true);

    try {
      const compressedFile = await compressVideo(input, {
        width: optionsValues.width,
        crf: optionsValues.crf,
        preset: optionsValues.preset
      });
      setResult(compressedFile);
    } catch (error) {
      console.error('Error compressing video:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedCompute = useCallback(debounce(compute, 1000), []);

  const getGroups: GetGroupsType<typeof initialValues> = ({
    values,
    updateField
  }) => [
    {
      title: 'Resolution',
      component: (
        <Box>
          {resolutionOptions.map((option) => (
            <SimpleRadio
              key={option.value}
              title={option.label}
              checked={values.width === option.value}
              onClick={() => {
                updateField('width', option.value);
              }}
            />
          ))}
        </Box>
      )
    },
    {
      title: 'Quality (CRF)',
      component: (
        <Box sx={{ mb: 2 }}>
          <Slider
            min={0}
            max={51}
            style={{ width: '90%' }}
            value={values.crf}
            onChange={(value) => {
              updateField('crf', typeof value === 'number' ? value : value[0]);
            }}
            marks={{
              0: 'Lossless',
              23: 'Default',
              51: 'Worst'
            }}
          />
        </Box>
      )
    }
    // {
    //   title: 'Encoding Preset',
    //   component: (
    //     <SelectWithDesc
    //       selected={values.preset}
    //       onChange={(value) => updateField('preset', value)}
    //       options={presetOptions}
    //       description={
    //         'Determines the compression speed. Slower presets provide better compression (quality per filesize) but take more time.'
    //       }
    //     />
    //   )
    // }
  ];

  return (
    <ToolContent
      title={title}
      input={input}
      inputComponent={
        <ToolVideoInput
          value={input}
          onChange={setInput}
          title={'Input Video'}
        />
      }
      resultComponent={
        <ToolFileResult
          title={'Compressed Video'}
          value={result}
          extension={'mp4'}
          loading={loading}
          loadingText={'Compressing video...'}
        />
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={debouncedCompute}
      setInput={setInput}
      validationSchema={validationSchema}
    />
  );
}
