import React, {ChangeEvent, FC} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useTranslation } from 'react-i18next'


type LanguageOption = {
    code: string;
    name: string;
}

const LanguageSelector: FC = () => {
    const { t, i18n } = useTranslation();

    const selectLanguageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;

        i18n.changeLanguage(newLanguage);
    }

    const English = t('en');
    const Romanian = t('ro');
    const Serbian = t('sr');

    const languages: LanguageOption[] = [
        {code:'en', name: English},
        {code:'ro', name: Romanian},
        {code:'sr', name: Serbian},
    ]

  return (
    <Box sx={{ position: 'absolute', top: 15, right: 25, minWidth: 120, }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {t('language')}
        </InputLabel>
        <NativeSelect
          defaultValue={'eng'}
          onChange={selectLanguageHandler}
          inputProps={{
            name: 'languge',
            id: 'uncontrolled-native',
          }}
        >
          {languages.map((lang: LanguageOption) => (
            <option key={lang.code} value = {lang.code}>
                {lang.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default LanguageSelector;