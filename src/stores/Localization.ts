import { action, computed, observable, reaction } from 'mobx';
import {
    createIntlCache,
    createIntl,
    IntlShape,
    defineMessages,
} from 'react-intl';

import text from '../locale/en.json'

class Localization {
    @observable.shallow messages: Record<string, string> = text;
    @observable locale = "en";
    @observable intl: IntlShape;

    // @observable private _locale: string;
    // private defaultLocale = 'en';

    constructor() {
        const cache = createIntlCache();

        this.intl = createIntl({
                locale: this.locale,
                messages: this.messages,
            },
            cache,
        );
    }

    // constructor() {
    //     this._locale = localStorage.getItem('locale') || this.defaultLocale;
    //
    //     this.initIntl().then(() => {
    //         reaction(() => this.locale, () => this.initIntl());
    //         reaction(() => this.messages, () => this.initIntl());
    //     });
    // }
    //
    // @computed
    // get locale() {
    //     return this._locale;
    // }

    // set locale(locale: string) {
    //     if (this._locale !== locale) {
    //         localStorage.setItem('locale', locale);
    //
    //         this._locale = locale;
    //         this.fetchTranslation(this._locale);
    //     }
    // }

    // @action.bound
    // async restoreDefaults() {
    //     this._locale = this.defaultLocale;
    //     await this.fetchTranslation(this._locale);
    // }

    // @action.bound
    // async fetchTranslation(locale: string) {
    //     try {
    //         const response = await httpFacade.localization.fetchLocalization(locale);
    //
    //         this.messages = response.data;
    //     } catch (error) {
    //         Log.error(error);
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
