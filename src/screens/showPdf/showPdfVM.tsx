import {makeAutoObservable} from 'mobx';
import RNFetchBlob from 'rn-fetch-blob';
import {BaseData} from 'src/commons/types';
import PapaParse from 'papaparse';
import DocumentPicker from 'react-native-document-picker';

export default class ShowPdfStore {
  isLoading = false;
  uri = '';
  csvText = '';
  pickCsv = 0; //0: chưa pick, 1: csv,2: pdf
  textPick = 'Chưa chọn'; //0: chưa chọn, 1: csv,2: pdf
  csvUrl =
    'https://raw.githubusercontent.com/Statology/Miscellaneous/main/basketball_data.csv';
  pdfUrl = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';

  constructor() {
    makeAutoObservable(this, {});
  }

  update(key: string, value: unknown) {
    (this as Record<string, unknown>)[key] = value;
  }

  setValueFiels = (rawData?: BaseData) => {
    this.update(`${rawData?.id}`, rawData?.data);
  };

  HandleLink = async (url: string) => {
    const {config, fs} = RNFetchBlob;
    const {DownloadDir} = fs.dirs;
    const date = new Date();
    this.update('isLoading', true);
    let typeUrl = url.substring(url.length - 3, url.length);
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // true will use native manager and be shown on notification bar.
        notification: true,
        path: `${DownloadDir}/me_${Math.floor(
          date.getTime() + date.getSeconds() / 2,
        )}.${typeUrl}`,
        description: 'Downloading.',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        let uriLink = 'file://' + res.path();
        console.log(uriLink);
        if (typeUrl === 'csv') {
          this.update('pickCsv', 1);
          fetch(uriLink)
            .then(response => response.text())
            .then(responseText => {
              // console.log('result', JSON.stringify(result, null, 2));
              let options = {};
              let val = PapaParse.parse(responseText, options);
              console.log('result', JSON.stringify(val, null, 2));
              //   console.log('responseText', responseText);
              this.update('isLoading', false);
              this.update('textPick', 'CSV');
              this.update('csvText', responseText);
            });
        } else {
          this.update('textPick', 'PDF');
          this.update('pickCsv', 2);
          this.update('uri', uriLink);
        }
      });
  };

  HandleChoose = async () => {
    try {
      const typeCSVFile = 'text/comma-separated-values';
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.csv, typeCSVFile],
        copyTo: 'documentDirectory',
      });
      let uriLink = file[0].fileCopyUri ?? '';
      console.log('uriLink', uriLink);
      this.update('isLoading', true);
      if (
        file[0].type === DocumentPicker.types.csv ||
        file[0].type === typeCSVFile
      ) {
        fetch(uriLink)
          .then(response => response.text())
          .then(responseText => {
            // console.log('result', JSON.stringify(result, null, 2));
            let options = {};
            let val = PapaParse.parse(responseText, options);
            console.log('result', JSON.stringify(val, null, 2));
            //   console.log('responseText', responseText);
            this.update('isLoading', false);
            this.update('pickCsv', 1);
            this.update('textPick', 'CSV');
            this.update('csvText', responseText);
          });
      } else {
        this.update('textPick', 'PDF');
        this.update('pickCsv', 2);
        this.update('uri', uriLink);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        throw error;
      }
    }
  };
}

export const ShowPdfViewModel = {
  current: new ShowPdfStore(),
};

export const clearShowPdfStore = () => {
  ShowPdfViewModel.current = new ShowPdfStore();
};
