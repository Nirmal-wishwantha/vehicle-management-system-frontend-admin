import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import NoCrashIcon from '@mui/icons-material/NoCrash';

export default function ProfileCard({ brand, model, price,imageUrl, description, onDelete, onUpdate,number,onReserve }) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>

          <Typography gutterBottom variant="h5" component="div">
            {number}
          </Typography>

          <CardMedia
            component="img"
            height="140"
            image={imageUrl} // This should now be a string URL
            alt="vehicle img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             Brand : {brand}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
             Model : {model}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
             Price Rs: {price}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* Add CardActions to include the delete button */}
        <CardActions>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ margin: 1 }}>
              <Button
                onClick={onDelete}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Button
                onClick={onUpdate}
                variant="contained"
                color="#009999"
                startIcon={<UploadIcon />}
              >
                Update
              </Button>
            </Box>

            <Box>
              <Button
                onClick={onReserve}
                variant="contained"
                color="#009999"
                startIcon={<NoCrashIcon />}
              >
                Reserve
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </div>
  )
}
