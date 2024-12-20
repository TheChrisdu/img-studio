import React from 'react'
import { Controller } from 'react-hook-form'
import { Chip, Stack, Box, Typography } from '@mui/material'

import theme from '../../theme'
const { palette } = theme

import { FormChipGroupMultipleInputI } from './InputInterface'

const CustomizedChip = {
  fontSize: '0.9rem',
  mb: 0.2,
  border: 1,
  borderColor: palette.secondary.light,
  letterSpacing: '0.05px',
  '&:hover': {
    borderColor: palette.primary.main,
    bgcolor: palette.primary.main,
    transition: 'none',
    color: palette.text.primary,
    fontWeight: 500,
    letterSpacing: '0px',
  },
  '&:active': {
    boxShadow: 0,
  },
  '&.MuiChip-filled': {
    color: 'white',
    letterSpacing: '0.05px',
    '&:hover': {
      letterSpacing: '0px',
    },
  },
  '& .MuiChip-label': {
    px: 1,
  },
}

export default function FormInputChipGroupMultiple({
  name,
  label,
  control,
  width,
  setValue,
  options,
  required,
}: FormChipGroupMultipleInputI) {
  const handleChipClick = (clickedValue: string, value: string[]) => {
    const newValue = value.includes(clickedValue)
      ? required && value.length === 1 // Prevent removal if required and it's the last item
        ? value
        : value.filter((v) => v !== clickedValue)
      : [...value, clickedValue]

    setValue(name, newValue)
  }

  return (
    <Controller
      name={name}
      control={control}
      key={name}
      render={({ field: { onChange, value = [] } }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            width: width,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: palette.text.primary,
              fontSize: '0.75rem',
              fontWeight: 500,
              lineHeight: '1.3em',
              pb: 0.5,
            }}
          >
            {label + (required ? ' *' : '')}
          </Typography>

          <Stack
            direction="row"
            spacing={0}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            {options &&
              options.map((chip) => (
                <Chip
                  key={chip.value}
                  label={chip.label}
                  size="small"
                  component={'button'}
                  onClick={() => handleChipClick(chip.value, value)}
                  onChange={onChange}
                  variant={value.includes(chip.value) ? 'filled' : 'outlined'}
                  color={value.includes(chip.value) ? 'primary' : 'secondary'}
                  sx={CustomizedChip}
                />
              ))}
          </Stack>
        </Box>
      )}
    />
  )
}
