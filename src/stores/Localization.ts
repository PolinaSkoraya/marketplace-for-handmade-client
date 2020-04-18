import { action, computed, observable, reaction } from 'mobx';
import {
    createIntlCache,
    createIntl,
    IntlShape,
    defineMessages,
} from 'react-intl';

import EN from '../locale/en.json';
import RU from "../locale/ru.json";

class Localization {
    @observable messages: Record<string, string> = EN;
    @observable locale;
    @observable intl: IntlShape;
    private defaultLocale = 'en';
    // @observable private _locale: string;

    constructor () {
        this.locale = localStorage.getItem('locale') || this.defaultLocale;

        if (this.locale === "ru") {
            this.messages = RU;
        }

        const cache = createIntlCache();

        this.intl = createIntl({
                locale: this.locale,
                messages: this.messages,
            },
            cache,
        );
    }

    @action
    updateLocale (lang) {
        const cache = createIntlCache();

        if (lang === "en") {
            this.messages = EN;
        } else {
            this.messages = RU;
        }

        this.intl = createIntl({
                locale: this.locale,
                messages: this.messages,
            },
            cache,
        );
    }

    // @computed
    // get locale() {
    //     return this._locale;
    // }

    // set locale(locale: string) {
    //     if (this._locale !== locale) {
    //         localStorage.setItem('locale', locale);
    //
    //         this._locale = locale;
    //     }
    // }

    // formatMessage(key: string, values?: Record<string, any>) {
    //     if (!this.intl) {
    //         Log.warn("Localization didn't init");
    //         return key;
    //     }
    //
    //     const messages = defineMessages({
    //         [key]: {
    //             id: key,
    //         },
    //     });
    //
    //     return this.intl.formatMessage(messages[key], values);
    // }

    // private async initIntl() {
    //     // This is optional but highly recommended
    //     // since it prevents memory leak
    //     const cache = createIntlCache();
    //
    //     this.intl = createIntl(
    //         {
    //             locale: this.locale,
    //             messages: this.messages,
    //         },
    //         cache,
    //     );
    // }
}

export default Localization;
