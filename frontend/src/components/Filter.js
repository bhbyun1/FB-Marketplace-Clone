import React, {useContext, useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CategoryContext from './CategoryContext';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

// grabs the data based on filter input
// fetch based on books example provided by Professor Harrison
const fetchFilter = (setFilList, currCat) => {
  if (currCat) {
    // fetches the listings based on above modifications
    fetch('/v0/listings/category?fil=' + currCat, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setFilList(json);
      })
      .catch(() => {
      });
  }
};
/**
 * @return {object}
 */
export default function Filter() {
  // grab state for category
  const {currCat} = useContext(CategoryContext);
  // grabs state for window dimensions
  const {dimensions} = useContext(CategoryContext);
  // grabs state for search
  const {setSearch} = useContext(CategoryContext);
  // grabs state for filter
  const {setFilter} = useContext(CategoryContext);
  // grabs state for filter list
  const {filList, setFilList} = useContext(CategoryContext);
  // grabs state for opening dialog
  const [open, setOpen] = useState(false);
  const temp = [];
  let filterName = '';
  if (currCat && filList[0]) {
    for (const property in filList[0].attributes) {
      if (filList[0].attributes[property] !== undefined) {
        temp.push(filList[0].attributes[property]);
      }
    }
    filterName = filList[0].names;
  }
  // from Dialog component example
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // uses the fetchFilter function
  useEffect(() => {
    fetchFilter(setFilList, currCat);
  }, [setFilList, currCat]);
  // renders the filter part of the applicaton
  // uses Dialog component from MUI
  // https://codesandbox.io/s/2r9eq?file=/demo.js
  // also uses Accordian component
  // https://codesandbox.io/s/g8j7r?file=/demo.js
  return (
    <div>
      {currCat && temp && dimensions.width < 600?
        <Button variant="outlined" startIcon={<TuneIcon />}
          label='Filters' onClick={handleClickOpen}>
          Filter
        </Button> : ''}
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <Typography>Filters</Typography>
            <IconButton
              sx={{marginLeft: 'auto'}} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {currCat && temp && dimensions.width < 600? <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style= {{width: '90%'}}
          >
            <Typography>{filterName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup
                key="filters"
                aria-label="filters"
                defaultValue="filter"
                name="filters"
              >
                <FormControlLabel value='None'
                  control={<Radio />} key='None' label='None' onClick={()=>{
                    setFilter(undefined);
                    setSearch('');
                  }}
                />
                {temp.map((fil) => (
                  <FormControlLabel value={fil}
                    control={<Radio />} key={fil} label={fil} onClick={()=>{
                      setFilter(fil);
                      handleClose();
                      setSearch('');
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion> : ''}
      </Dialog>
      {currCat && temp && dimensions.width > 599? <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style= {{width: '90%'}}
        >
          <Typography>{filterName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup
              key = "filter2"
              aria-label="filter2"
              defaultValue="filter2"
              name="filter2"
            >
              <FormControlLabel value='None'
                control={<Radio />} key='None' label='None' onClick={()=>{
                  setFilter(undefined);
                  setSearch('');
                }}
              />
              {temp.map((fil) => (
                <FormControlLabel value={fil}
                  control={<Radio />} key={fil} label={fil} onClick={()=>{
                    setFilter(fil);
                    setSearch('');
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion> : ''}
    </div>
  );
}
