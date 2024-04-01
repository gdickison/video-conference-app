'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import HomeCard from './HomeCard'

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const router = useRouter()

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        bgColor='bg-orange-1'
        icon='/icons/add-meeting.svg'
        altText='add meeting'
        title='New Meeting'
        subtitle='Start an instant meeting'
        handleClick={() => setMeetingState('isJoiningMeeting')}
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
    </section>
  )
}

export default MeetingTypeList