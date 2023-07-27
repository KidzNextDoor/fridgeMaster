import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { levenshteinEditDistance } from 'levenshtein-edit-distance';
import moment from 'moment';
import { Grid, Typography } from '@mui/material';

export default function Suggestion({ input, setExpiration }) {
  const data = useLoaderData();
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    setSuggestion(
      data.data
        .filter(
          e =>
            e.Name.toLowerCase().includes(input) ||
            e.Name_subtitle.toLowerCase().includes(input) ||
            e.Keywords.toLowerCase().includes(input)
        )
        .sort(
          (a, b) =>
            levenshteinEditDistance(a.Name, input) -
            levenshteinEditDistance(b.Name, input)
        )
    );

    if (input.length && suggestion.length) {
      const expiration = moment().add(suggestion[0].Max, suggestion[0].Metric);
      setExpiration(expiration);
    }
  }, [input]);

  return (
    <Grid container spacing="2">
      <Grid item xs={9}>
        <Typography sx={{ padding: '1rem' }}>
          {input.length ? suggestion.length && suggestion[0].Name : ''}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ padding: '1rem' }}>
          {input.length
            ? suggestion.length &&
              `${suggestion[0].Max} ${suggestion[0].Metric}`
            : ''}
        </Typography>
      </Grid>
    </Grid>
  );
}
