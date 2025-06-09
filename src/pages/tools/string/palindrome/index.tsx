import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import { palindromeList, SplitOperatorType } from './service';
import RadioWithTextField from '@components/options/RadioWithTextField';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';

const initialValues = {
  splitOperatorType: 'symbol' as SplitOperatorType,
  symbolValue: ' ',
  regexValue: '\\s+'
};

const splitOperators: {
  title: string;
  description: string;
  type: SplitOperatorType;
}[] = [
  {
    title: 'Use a Symbol for Splitting',
    description:
      'Character that will be used to split text into parts for palindrome checking.',
    type: 'symbol'
  },
  {
    title: 'Use a Regex for Splitting',
    type: 'regex',
    description:
      'Regular expression that will be used to split text into parts for palindrome checking.'
  }
];

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Check for Word Palindromes',
    description:
      'Checks if each word in the text is a palindrome. Returns "true" for palindromes and "false" for non-palindromes.',
    sampleText: 'radar level hello anna',
    sampleResult: 'true true false true',
    sampleOptions: {
      ...initialValues,
      symbolValue: ' '
    }
  },
  {
    title: 'Check CSV Words',
    description: 'Checks palindrome status for comma-separated words.',
    sampleText: 'mom,dad,wow,test',
    sampleResult: 'true true true false',
    sampleOptions: {
      ...initialValues,
      symbolValue: ','
    }
  },
  {
    title: 'Check with Regular Expression',
    description:
      'Use a regular expression to split text and check for palindromes.',
    sampleText: 'level:madam;noon|test',
    sampleResult: 'true true true false',
    sampleOptions: {
      ...initialValues,
      splitOperatorType: 'regex',
      regexValue: '[:|;]|\\|'
    }
  }
];

export default function Palindrome({ title }: ToolComponentProps) {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    optionsValues: typeof initialValues,
    input: string
  ) => {
    const { splitOperatorType, symbolValue, regexValue } = optionsValues;
    const separator = splitOperatorType === 'symbol' ? symbolValue : regexValue;
    setResult(palindromeList(splitOperatorType, input, separator));
  };

  const getGroups: GetGroupsType<typeof initialValues> = ({
    values,
    updateField
  }) => [
    {
      title: 'Splitting options',
      component: splitOperators.map(({ title, description, type }) => (
        <RadioWithTextField
          key={type}
          checked={type === values.splitOperatorType}
          title={title}
          fieldName={'splitOperatorType'}
          description={description}
          value={values[`${type}Value`]}
          onRadioClick={() => updateField('splitOperatorType', type)}
          onTextChange={(val) => updateField(`${type}Value`, val)}
        />
      ))
    }
  ];

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={getGroups}
      compute={computeExternal}
      input={input}
      setInput={setInput}
      inputComponent={<ToolTextInput value={input} onChange={setInput} />}
      resultComponent={
        <ToolTextResult title={'Palindrome results'} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
