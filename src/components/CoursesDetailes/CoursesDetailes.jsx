import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import introvideo from '../../assets/videos/intro.mp4';

const CoursesDetailes = () => {
  //   const LectureTitle = 'Introduction';
  const [LectureNumber, setLectureNumber] = useState(0);
  //   const Description = 'This is a description';
  const lectures = [
    {
      _id: 'fdfsd',
      title: 'Introduction',
      description: 'This is a description',
      video: {
        url: introvideo,
      },
    },
    {
      _id: 'abc123',
      title: 'Chapter 1',
      description: 'Description for Chapter 1',
      video: {
        url: 'https://sharedby.blomp.com/WZV064',
      },
    },
    {
      _id: 'def456',
      title: 'Chapter 2',
      description: 'Description for Chapter 2',
      video: {
        url: introvideo,
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <Heading
          children={`#${LectureNumber + 1} ${lectures[LectureNumber].title}`}
          m={'4'}
          size={['lg']}
          textAlign={['center']}
          display={['block', 'none']}
        />
        <video
          width={'100%'}
          controls
          controlsList="nodownload  noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={lectures[LectureNumber].video.url}
        ></video>

        <Heading
          children={`#${LectureNumber + 1} ${lectures[LectureNumber].title}`}
          m={'4'}
          display={['none', 'block']}
        />
        <Heading children="Description" m={'4'} />
        <Text m={'4'} children={lectures[LectureNumber].description} />
      </Box>
      <VStack mt={'10'}>
        {lectures.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursesDetailes;
