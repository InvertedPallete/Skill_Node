import { useContext, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../modules/apiList";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const CreateJobs = (props) => {
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      sx={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Add Job</Typography>
      </Grid>
      <Grid item container xs direction="column" justifyContent="center">
        <Grid item>
          <StyledPaper>
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              <Grid item>
                <TextField
                  label="Title"
                  value={jobDetails.title}
                  onChange={(event) => handleInput("title", event.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={jobDetails.skillsets.join(', ')}
                  onChange={(event) => {
                    const skills = event.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                    handleInput("skillsets", skills);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  label="Job Type"
                  variant="outlined"
                  value={jobDetails.jobType}
                  onChange={(event) => handleInput("jobType", event.target.value)}
                  fullWidth
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Work From Home">Work From Home</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  select
                  label="Duration"
                  variant="outlined"
                  value={jobDetails.duration}
                  onChange={(event) => handleInput("duration", event.target.value)}
                  fullWidth
                >
                  <MenuItem value={0}>Flexible</MenuItem>
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Salary"
                  type="number"
                  variant="outlined"
                  value={jobDetails.salary}
                  onChange={(event) => handleInput("salary", event.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Application Deadline"
                  type="datetime-local"
                  value={jobDetails.deadline}
                  onChange={(event) => handleInput("deadline", event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Maximum Number Of Applicants"
                  type="number"
                  variant="outlined"
                  value={jobDetails.maxApplicants}
                  onChange={(event) => handleInput("maxApplicants", event.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Positions Available"
                  type="number"
                  variant="outlined"
                  value={jobDetails.maxPositions}
                  onChange={(event) => handleInput("maxPositions", event.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 50px", marginTop: "30px" }}
              onClick={handleUpdate}
            >
              Create Job
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateJobs;
