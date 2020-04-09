import { findByText, fireEvent } from '@testing-library/dom';
import React, { useState } from 'react';
import Select from 'react-select';
import invariant from 'tiny-invariant';
import { InteractionTaskArgs } from '../src';

export default {
  title: 'Examples',
};

const options = Array.from({ length: 1000 }, (_, k) => ({
  value: `Option ${k}`,
  label: `Option ${k}`,
}));

function SelectExample() {
  return (
    <Select
      placeholder={`Select with ${options.length} items`}
      classNamePrefix="addon"
      options={options}
      instanceId="stable"
    />
  );
}

export const select = () => <SelectExample />;

select.story = {
  name: 'React select',
  parameters: {
    performance: {
      interactions: [
        {
          name: 'Display dropdown',
          run: async ({ container }: InteractionTaskArgs): Promise<void> => {
            const element: HTMLElement | null = container.querySelector(
              '.addon__dropdown-indicator',
            );
            invariant(element);
            fireEvent.mouseDown(element);
            await findByText(container, 'Option 5', undefined, { timeout: 20000 });
          },
        },
      ],
    },
  },
};

export const noInteractions = () => <p>A story with no interactions 👋</p>;

function burnCpu() {
  const start = performance.now();
  while (performance.now() - start < 200) {}
}

function Slow() {
  burnCpu();

  return (
    <>
      A <strong>slow</strong> component
    </>
  );
}

export const slow = () => <Slow />;
