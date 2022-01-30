/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import { about } from '../../portfolio'
import './About.css'




const About = () => {
  const { name, role, description, resume, social } = about

  const [open, setOpen] = React.useState(false);
  const [snackText, setSnackText] = React.useState('');
  const [snackIsOpen, setSnackIsOpen] = React.useState(false);
  const [snackType, setSnackType] = React.useState('success');
  const [message, setMessage] = React.useState('');
  const [personName, setPersonName] = React.useState('');
  const [contactDetails, setContactDetails] = React.useState('');
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeSnackBar = () => {
    setSnackIsOpen(false);
    setSnackText('');
    setSnackType('');
  }

  const handleCancel = () => {
    setOpen(false);
    setSnackText('Canceled, no message will be sent.');
    setSnackType('info');
    setSnackIsOpen(true);
  }

  const handleClose = async () => {
    if(!personName || !contactDetails || !message) {
      setSnackText('Please fill in all fields');
      setSnackType('error');
      setSnackIsOpen(true);
      return;
    }
    const data = {
      "embeds": [ 
        {
          "title": "New Message",
          "color": 1048325,
          "fields": [
            {
              "name": "Name",
              "value": personName,
            },
            {
              "name": "Contact Info",
              "value": contactDetails,
            },
            {
              "name": "Message",
              "value": message,
            }
          ],
          "timestamp": new Date(),
        }
      ]
    }
    await fetch("https://discord.com/api/webhooks/937456404388798536/X5c1OtX9APFiWqusgKRYo3cRvnp7Phwf6NNt4a7yX8XZG0UHXugRhnv0jetjQ-WCF34I", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => {
      if(!res.ok) {
         const rspJobj = await res.json(); 
         setSnackText(`Request failed: ${rspJobj.code} (${res.status}) - ${rspJobj.message}`);
         setSnackType('error');
         setSnackIsOpen(true);
      } else if (res.ok) {
        setSnackText('Message sent!');
        setSnackType('success');
        setSnackIsOpen(true);
      }
    })
    setMessage('')
    setPersonName('')
    setContactDetails('')
    setOpen(false);
  };

  return (
    <div className='about center'>
      <Snackbar open={snackIsOpen} autoHideDuration={5000} onClose={closeSnackBar}>
        <MuiAlert severity={snackType} sx={{ width: '100%' }}>
          {snackText}
        </MuiAlert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please fill out the form below to send me a message. I will get back to you as soon as possible. <br/><br/> Also, sorry for the flashbang of white, MUI hates me.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            helperText="Please enter your name"
            fullWidth
            variant="filled"
            label="Name"
            required
            onChange={(e) => setPersonName(e.target.value)}
          />
          <br/><br/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            helperText="Please enter any contact details you have"
            fullWidth
            required
            variant="filled"
            label="Contact Details"
            onChange={(e) => setContactDetails(e.target.value)}
          />
           <br/><br/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            helperText="Please enter your message"
            fullWidth
            variant="filled"
            label="Message"
            required
            onChange={(e) => setMessage(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Send Message</Button>
        </DialogActions>
      </Dialog>
      {name && (
        <h1>
          Hi, I am <span className='about__name'>{name}.</span>
        </h1>
      )}

      {role && <h2 className='about__role'>A {role}.</h2>}
      <p className='about__desc'>{description && description}</p>

      <div className='about__contact center'>
        {resume && (
          <a href="#open-contact">
            <span type='button' className='btn btn--outline' onClick={handleClickOpen}>
              Contact Me
            </span>
          </a>
        )}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
              >
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
              >
                <LinkedInIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default About
