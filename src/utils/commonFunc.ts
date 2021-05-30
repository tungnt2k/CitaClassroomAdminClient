import QueryString from 'query-string';
import { useIntl } from 'umi';
import { openNotificationWithIcon } from '@/utils/notification';

const { formatMessage } = useIntl();

export function getQueryString(locationSearch: string) {
  return QueryString.parse(locationSearch);
}

export function checkSex(sex: number) {
  return sex ? 'Nam' : 'Nữ';
}

export function beforeUpload(file: any) {
  let validFile = true;
  if (file.type.includes('image/') && file.size / 1024 / 1024 > 5) {
    openNotificationWithIcon(
      'error',
      'Thông báo',
      formatMessage({ id: 'i18n_image_over_5mb' }),
    );
    validFile = false;
  }
  if (file.type.includes('video/') && file.size / 1024 / 1024 > 60) {
    openNotificationWithIcon(
      'error',
      'Thông báo',
      formatMessage({ id: 'i18n_video_over_60mb' }),
    );
    validFile = false;
  }
  return validFile;
}
