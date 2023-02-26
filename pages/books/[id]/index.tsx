import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '@/layouts/MainLayout'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, Breadcrumbs, Typography, Chip, TextField, Button } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import ja from 'dayjs/locale/ja'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useReward } from 'react-rewards'
import styles from './style.module.css'
import { trpc } from '@/utils/trpc'
import { useSnackbar } from '@/components/providers/GlobalSnackbar'

export default function Book() {
  const router = useRouter()
  const bookId = router.query.id !== undefined && typeof router.query.id !== 'object' ? router.query.id : ''

  // 貸出中、予約中の日付を取得する
  const eventInfo = trpc.book.getEvent.useQuery({
    bookId: bookId,
  })
  // const {bookInfo, events} = getEventInfo.data

  // 貸出の登録処理
  const lendCreate = trpc.lending.create.useMutation()
  const reservationCreate = trpc.reservation.create.useMutation()
  const [startAt, setStartAt] = useState<Dayjs | null>(null)
  const [endAt, setEndAt] = useState<Dayjs | null>(null)

  const { reward: rewardL, isAnimating: animeL } = useReward('rewardLeft', 'confetti', {
    angle: 110,
    position: 'absolute',
  })
  const { reward: rewardR, isAnimating: animeR } = useReward('rewardRight', 'confetti', {
    angle: 60,
    position: 'absolute',
  })

  const { showSnackbar } = useSnackbar()

  /**
   * 登録できるか判定する処理
   * @returns boolean trueが登録できる。falseができない
   */
  const isCanSubmit = () => {
    let isCanSubmit = true
    let message = ''

    if (startAt === null || endAt === null) {
      isCanSubmit = false
      message = '貸出日または予約日が設定されていません'
      return { isCanSubmit: isCanSubmit, message: message }
    } else if (eventInfo.data?.events === undefined) {
      isCanSubmit = false
      message = 'イベントが取得されていません'
      return { isCanSubmit: isCanSubmit, message: message }
    }

    // dayjsに日付比較のプラグインをセットする
    dayjs.extend(isBetween)
    const selectedStartDate = dayjs(startAt).format('YYYY-MM-DD')
    const selectedEndDate = dayjs(endAt).format('YYYY-MM-DD')

    for (const event of eventInfo.data?.events) {
      // []でbetweenStartDateとbetweenEndDateの日付が含まれるようにしている
      const isStartDate = dayjs(selectedStartDate).isBetween(event.start, event.end, 'day', '()')
      const isEndDate = dayjs(selectedEndDate).isBetween(event.start, event.end, 'day', '()')

      if (isStartDate || isEndDate) {
        isCanSubmit = false
        message = '貸出、または予約日と被っています。 別の日程に変更してください。'
        return { isCanSubmit: isCanSubmit, message: message }
      }
    }

    return { isCanSubmit: isCanSubmit, message: message }
  }

  const handleLending = () => {
    if (!isCanSubmit().isCanSubmit) return alert(isCanSubmit().message)

    const startDate = startAt!.toString()
    const endDate = endAt!.toString()
    lendCreate.mutate(
      {
        bookId: bookId,
        startAt: startDate,
        endAt: endDate,
      },
      {
        onSuccess: () => {
          showSnackbar('本を借りました', 'success')
          rewardL()
          rewardR()
        },
        onError: () => showSnackbar('エラーが発生しました。再度お試しください。', 'error'),
      }
    )
  }

  const handleReservation = () => {
    if (!isCanSubmit().isCanSubmit) return alert(isCanSubmit().message)

    const startDate = startAt!.toString()
    const endDate = endAt!.toString()
    reservationCreate.mutate(
      {
        bookId: bookId,
        startAt: startDate,
        endAt: endDate,
      },
      {
        onSuccess: () => {
          showSnackbar('本を予約しました', 'success')
          rewardL()
          rewardR()
        },
        onError: () => showSnackbar('エラーが発生しました。再度お試しください。', 'error'),
      }
    )
  }

  const handleReset = () => {
    setStartAt(null)
    setEndAt(null)
  }

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
          <Typography color="text.primary">{eventInfo.data?.title}</Typography>
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
              {eventInfo.data?.title}
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
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={eventInfo.data?.events} />
      </Grid>
    </MainLayout>
  )
}
