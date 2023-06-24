import { RiImageAddFill } from 'react-icons/ri';
import { RiVideoAddLine } from 'react-icons/ri';

function ModifyFiles({images, video, onUploadImage, onUploadVideo}) {

  return(
    <>
      <div className="uploadFile">
        <div>
          <label htmlFor='image'>
            <RiImageAddFill />
          </label>
        </div>
        <input type="file" id="image" accept="image/*" onChange={event=>onUploadImage(event)} style={{display:'none'}}/>
        <div>
          <label htmlFor='video'>
            <RiVideoAddLine />
          </label>
        </div>
        <input type="file" id="video" accept="video/mp4" onChange={event=>onUploadVideo(event)} style={{display:'none'}}/>
      </div>
      {images && images.map((image, index) => (
        <img src={image} alt="" key={index}/>
      ))}
      {video && <video src={video} controls type="video/mp4"/>}
    </>
  );
}

export default ModifyFiles;