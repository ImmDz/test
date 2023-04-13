import { FC, useEffect, useState, useCallback } from "react";
import { Input, Select, Slider, Table, Button, Pagination, Switch, Layout, Space } from "antd";
import { categoryActions, goodActions, getGoods, getCategories, getGoodsLoadStatus, getTotal } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { Good, GoodsSearch } from "src/types/general";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import css from "./goodsPage.module.css";
const { Search } = Input;
const { Content } = Layout;

interface Filter {
    selectValue: string;
    currentPage: number;
    searchValue: string;
    sorter: keyof Good;
    sortDirections: boolean;
}

export const GoodsPage: FC = () => {
    const loadStatus = useSelector(getGoodsLoadStatus);
    const goods = useSelector(getGoods);
    const totalGoods = useSelector(getTotal);
    const categories = useSelector(getCategories);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<Partial<Filter>>({ sortDirections: true, currentPage: 1 });
    const [params, setParams] = useState<Partial<GoodsSearch>>({ limit: 20 });

    const columns = [
        { title: "Название", width: 100, render: (value: Good) => <Link to={`/product/${value.id}`}>{value.label}</Link> },
        { title: "Описание", dataIndex: "description", width: "60%", ellipsis: true },
        { title: "Цена", dataIndex: "price", width: 80 },
        { title: "Изображение", dataIndex: "img", width: "15%", ellipsis: true },
        { title: "ID", dataIndex: "id", width: 50 }
    ];

    useEffect(() => {
        dispatch(categoryActions.serverRequest());
    }, []);

    useEffect(() => {
        goodsRequest(params);
    }, [params]);

    useEffect(() => {
        if (filter?.selectValue) {
            setParams({ ...params, categoryTypeIds: findCategoryId(), offset: 0 });
            setFilter({ ...filter, currentPage: 1 });
        };
    }, [filter?.selectValue]);

    const findCategoryId = () => {
        const category = categories.find((category) => category.type === filter?.selectValue);
        return category?.id;
    };

    const goodsRequest = useCallback(debounce((params: Partial<GoodsSearch>) => dispatch(goodActions.serverRequest(params)), 1_500), []);
    const onSorterChange = (selectedSorter: keyof Good) => {
        setParams({ ...params, sortBy: selectedSorter, sortDirection: filter.sortDirections ? "asc" : "desc", offset: 0 });
        setFilter({ ...filter, sorter: selectedSorter, currentPage: 1 });
    }
    return (
        <Content className="content">
            <div className={css.filter}>
                <Search
                    className={css.searchInput}
                    value={filter?.searchValue}
                    placeholder="Поиск по названию"
                    allowClear
                    enterButton="Искать"
                    onChange={(e) => setFilter({ ...filter, searchValue: e.target.value })}
                    onSearch={(value) => {
                        if (value.trim()) {
                            setParams({ ...params, text: value, offset: 0 })
                        }
                        if (params.text) {
                            delete params.text;
                            setParams({ ...params, offset: 0 });
                        }
                    }}
                />
                <Select
                    placeholder="Категории"
                    value={filter?.selectValue}
                    onChange={(value) => setFilter({ ...filter, selectValue: value })}
                    options={categories.map((category) => ({ label: category.label, value: category.type }))} />
                <Space className="sorter-filter">
                    <Select value={filter?.sorter} placeholder="Сортировать" onChange={onSorterChange}>
                        <Select.Option value="label">Название</Select.Option>
                        <Select.Option value="price">Цена</Select.Option>
                    </Select>
                    <Switch checked={filter?.sortDirections} defaultChecked={true} checkedChildren={params.sortBy === "label" ? 'A-Z' : "По возрастанию"} unCheckedChildren={params.sortBy === "label" ? 'Z-A' : "По убыванию"} onChange={(value) => {
                        if (params?.sortBy) {
                            value ? setParams({ ...params, sortDirection: 'asc', offset: 0 }) : setParams({ ...params, sortDirection: 'desc', offset: 0 });
                        }
                    }}
                        onClick={(value) => {
                            setFilter({ ...filter, sortDirections: value, currentPage: 1 });
                        }} />
                </Space>
                <div className="price-filter">
                    <h4>Диапазон цены</h4>
                    <Slider
                        tooltip={{
                            placement: "top",
                        }}
                        step={10}
                        range
                        min={0}
                        max={1000}
                        onChange={(value) => {
                            setParams({ ...params, minPrice: value[0], maxPrice: value[1], offset: 0 });
                            setFilter({ ...filter, currentPage: 1 });
                        }}
                    />
                </div>
                <Button
                    onClick={() => {
                        setParams({ limit: 20 });
                        setFilter({ sortDirections: true, currentPage: 1 });
                    }}>Сбросить
                </Button>
            </div>
            <Table
                pagination={false}
                loading={loadStatus === "LOADING"}
                columns={columns}
                dataSource={goods.map((good) => ({ ...good, key: good.id }))}
            >
            </Table>

            <Pagination
                current={filter?.currentPage}
                pageSize={params?.limit || 20}
                total={totalGoods}
                showQuickJumper={true}
                showSizeChanger={true}
                defaultPageSize={20}
                pageSizeOptions={filter?.selectValue ? [10, 20] : [10, 20, 50, 100, 220]}
                onChange={(page, pageSize) => {
                    setParams({ ...params, offset: pageSize * (page - 1), limit: pageSize });
                    if (filter?.currentPage === page) {
                        setFilter({ ...filter, currentPage: 1 })
                    } else setFilter({ ...filter, currentPage: page });
                }}
            />
        </Content>
    )
}