'use client'

import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import {useUser} from '@clerk/nextjs'
import {useStreamVideoClient, Call} from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast();

  const createMeeting = async () => {
    if(!client || !user) return;
    try {
      if(!values.dateTime) {
        toast({title: 'Please select a date and a time'});
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if(!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      });

      setCallDetails(call);
      if(!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({title: 'Meeting created'});
    } catch (error) {
      console.log('Error: ', error);
      toast({
        title: 'Failed to create meeting'
      })
    }
  }
  const router = useRouter()

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        bgColor='bg-orange-1'
        icon='/icons/add-meeting.svg'
        altText='add meeting'
        title='New Meeting'
        subtitle='Start an instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        bgColor='bg-blue-1'
        icon='/icons/schedule.svg'
        altText='schedule meeting'
        title='Schedule Meeting'
        subtitle='Plan your meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        bgColor='bg-purple-1'
        icon='/icons/recordings.svg'
        altText='view recordings'
        title='View Recordings'
        subtitle='See your recordings'
        handleClick={() => router.push('/recordings')}
      />
      <HomeCard
        bgColor='bg-yellow-1'
        icon='/icons/join-meeting.svg'
        altText='join meeting'
        title='Join Meeting'
        subtitle='via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList