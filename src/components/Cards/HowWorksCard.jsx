import { Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import StepCard from './StepCard';
import step1Img from '../../assets/images/i01.avif';
import step2Img from '../../assets/images/i02.png';
import step3Img from '../../assets/images/i03.png';
import step4Img from '../../assets/images/i04.avif';
import step5Img from '../../assets/images/i05.avif';
import step6Img from '../../assets/images/i06.png';
const HowWorksCard = () => {
  return (
    <Container mt={10} minW={['100%', 'container.xl']} p={0}>
      <VStack>
        <Heading size="2xl" fontWeight={'500'}>
          How does it work?
        </Heading>
        <Text>Six Steps to get started with Data Skills Hub.</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <StepCard
            description={
              'Begin your journey with an in-depth consultation to understand your career goals.'
            }
            title={'Initiation'}
            no={'1'}
            img={step1Img}
          />
          <StepCard
            description={
              ' Set up your personalized training and job placement timeline. Contracts & Pay: Finalize agreements, including terms, conditions, and compensation details.'
            }
            title={'Scheduling '}
            no={'2'}
            img={step2Img}
          />
          <StepCard
            description={
              'Receive expert training in high-demand IT skills to enhance your professional profile.'
            }
            title={'Contracts & Pay'}
            no={'3'}
            img={step3Img}
          />
          <StepCard
            description={
              'Practice with mock interviews to sharpen your skills and boost your confidence.'
            }
            title={'Training'}
            no={'4'}
            img={step4Img}
          />
          <StepCard
            description={
              'Begin your journey with an in-depth consultation to understand your career goals.'
            }
            title={'Mock Interviews'}
            no={'5'}
            img={step5Img}
          />
          <StepCard
            description={
              'Secure your dream job in 45-60 days with our dedicated placement support.'
            }
            title={'Get your dream job'}
            no={'6'}
            img={step6Img}
          />
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HowWorksCard;
