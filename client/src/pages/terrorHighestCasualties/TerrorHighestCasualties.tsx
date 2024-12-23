import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Map from '../../components/navBar/map/Map'

export default function TerrorHighestCasualties() {
  return (
    <Stack spacing={2} direction="column">
    <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-around"}
    >
        <Typography variant="h4" id="demo-simple-select-label">
        terror highest casualties
        </Typography>
        <Stack spacing={2} direction="row" padding={2}>
            <TextField value={city} onChange={(e) => setCity(e.target.value)} variant="filled" label="enter city or nothing" />
            <Button onClick={handelOnClick} variant="contained">Slect city</Button>
        </Stack>
    </Stack>
    <Stack>
        <Map data={data} />
    </Stack>
</Stack>
  )
}
