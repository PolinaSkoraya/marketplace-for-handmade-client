import style from "./style.module.scss";
import React, { Component } from "react";
import {GoodsContainer, GoodsContainerType} from "../../components/GoodsContainer/GoodsContainer";
import { observer } from "mobx-react";
import GoodsStore from "../../stores/GoodsStore";
import Pagination from "../../components/Pagination/Pagination";
import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { goodsCategories } from "../../stores/helpers/interfaces";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { DebounceInput } from "react-debounce-input";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import dropdownStyle from "../../styles/dropdownStyle.module.scss";

@observer
class GoodsPage extends Component {
  store: GoodsStore = new GoodsStore();

  async componentDidMount() {
    await this.store.search();
    this.store.showReset = false;
  }

  render() {
    const options = Array.from(Object.values(goodsCategories));

    return (
        <div className={style.goodsPage}>
          <div className={style.goodsPage__search}>
            <div className={style.search}>
              {this.store.showReset && (
                <>
                  <Button
                    styleType="small"
                    className={style.buttonCancel}
                    onClick={() => this.store.resetGoods()}
                  >
                    <MdCancel />
                  </Button>
                </>
              )}
              <IconContext.Provider value={{ className: style.searchIcon }}>
                <FiSearch />
              </IconContext.Provider>

              <DebounceInput
                minLength={3}
                debounceTimeout={1000}
                onChange={(event) =>
                  this.store.searchByName({ value: event.target.value })
                }
                className={classNames("input", style.inputSearch)}
                value={this.store.searchName}
                placeholder="Search..."
              />
            </div>

            <Dropdown
              onChange={(event) => this.store.searchByCategory(event.value)}
              options={options}
              placeholder="Choose category"
              arrowClassName={dropdownStyle.dropArrow}
              controlClassName={dropdownStyle.dropControl}
              menuClassName={dropdownStyle.dropMenu}
              className={classNames(dropdownStyle.drop, style.dropMargin)}
              value={this.store.searchCategory}
            />
          </div>

          {Boolean(this.store.goods.length) ? (
            <>
              <GoodsContainer goods={this.store.goods} goodsContainerType={GoodsContainerType.goods} />

              <Pagination
                currentPage={this.store.currentPage}
                nextPage={this.store.nextPage}
                numberOfPages={this.store.numberOfPages}
                previousPage={this.store.previousPage}
                setPage={this.store.setPage}
              />
            </>
          ) : (
            <div className={style.messageNotFound}>
              <FormattedMessage id="notFound"/>
            </div>
          )}
        </div>
    );
  }
}

export default GoodsPage;
