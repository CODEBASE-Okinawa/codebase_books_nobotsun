import { useState, useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, Breadcrumbs, Typography, Chip, TextField, Button } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import ja from 'dayjs/locale/ja'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useReward } from 'react-rewards'
import styles from './style.module.css'
import { trpc } from '@/utils/trpc'

type Event = {
  title: string
  start: string | Date
  end: string | Date
}

export default function Book() {
  const create = trpc.lending.create.useMutation()
  const [startAt, setStartAt] = useState<Dayjs | null>(null)
  const [endAt, setEndAt] = useState<Dayjs | null>(null)
  const [events, setEvents] = useState<Event[] | undefined>(undefined)

  const { reward: rewardL, isAnimating: animeL } = useReward('rewardLeft', 'confetti', {
    angle: 110,
    position: 'absolute',
  })
  const { reward: rewardR, isAnimating: animeR } = useReward('rewardRight', 'confetti', {
    angle: 60,
    position: 'absolute',
  })

  const handleLending = () => {
    // TODO: 借りるときの実装をAPIに投げる
    if (startAt !== null && endAt !== null) {
      const startDate = startAt.toISOString()
      const endDate = endAt.toISOString()
      create.mutate({
        bookId: 'clea0pm5a000anua1conzfq5j',
        lendStartAt: startDate,
        lendEndAt: endDate,
      })
      if (create.isSuccess) {
        console.log('登録が完了しました')
        // 紙吹雪アニメーション
        rewardL()
        rewardR()
      }
    }
  }

  const handleReservation = () => {
    // TODO: 予約するときの実装をAPIに投げる

    // 紙吹雪アニメーション
    rewardL()
    rewardR()
  }

  const handleReset = () => {
    setStartAt(null)
    setEndAt(null)
  }

  useEffect(() => {
    // TODO: APIから取得する
    const events = [
      {
        title: '貸出中',
        start: '2023-02-10',
        end: '2023-02-14',
      },
      {
        title: '貸出中',
        start: '2023-02-20',
        end: '2023-02-23',
      },
    ]
    setEvents(events)
  }, [])

  useEffect(() => {
    if (!startAt || endAt) return
    const calcEndAt = dayjs(startAt).add(14, 'day')
    setEndAt(calcEndAt)
  }, [startAt, endAt])

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Breadcrumbs>
          <Link href="/books">本一覧</Link>
          <Typography color="text.primary">ここに本のタイトルが入ります</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Image
          style={{
            width: '100%',
            height: 'auto',
          }}
          src="/images/no-image.jpg"
          sizes="100vw"
          width={1080}
          height={1150}
          alt="title"
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <div className={styles.margin}>
          <div className={styles.margin}>
            <Typography component="h2" variant="h5">
              プログラミング言語Ruby
            </Typography>

            <Chip label="貸出可能" color="success" />
          </div>

          <div className={styles.margin}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja} dateFormats={{ monthAndYear: 'YYYY年 MM月' }}>
              <div className={`${styles.margin} ${styles.datePicker}`}>
                <DatePicker
                  label="貸出日"
                  inputFormat="YYYY年MM月DD日"
                  mask="____年__月__日"
                  value={startAt}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    setStartAt(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography component="span" variant="h5" sx={{ marginLeft: 1 }}>
                  から
                </Typography>
              </div>
              <div className={styles.datePicker}>
                <DatePicker
                  label="返却日"
                  inputFormat="YYYY年MM月DD日"
                  mask="____年__月__日"
                  value={endAt}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    setEndAt(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography component="span" variant="h5" sx={{ marginLeft: 1 }}>
                  まで
                </Typography>
              </div>
            </LocalizationProvider>
          </div>
          <div>
            <Button sx={{ marginBottom: 3 }} variant="contained" color="error" onClick={handleReset}>
              リセット
            </Button>
            <div className={styles.btnBlock}>
              <span id="rewardLeft" className={styles.absolute} />
              <Button variant="contained" color="primary" onClick={handleLending}>
                借りる
              </Button>
              <Button variant="contained" color="warning" onClick={handleReservation}>
                予約する
              </Button>
              <span id="rewardRight" className={`${styles.absolute} ${styles.right}`} />
            </div>
          </div>
        </div>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
      </Grid>
    </MainLayout>
  )
}
