export enum FilterOption {
  // NoFilter don't filter results
  NoFilter = "0",
  // NoRemakes no remakes, no idea what this option on nyaa is
  NoRemakes = "1",
  // TrustedOnly show only results from trusted submitters
  TrustedOnly = "2",
}

export enum CategoryOption {
  // AllCategories all categories
	AllCategories = "0_0",

	// Anime all anime
	Anime = "1_0",
	// AnimeMusicVideo anime music video
	AnimeMusicVideo = "1_1",
	// AnimeEnglishTranslated english translated anime
	AnimeEnglishTranslated = "1_2",
	// AnimeNonEnglishTranslated non-english translated anime
	AnimeNonEnglishTranslated = "1_3",
	// AnimeRaw raw anime
	AnimeRaw = "1_4",

	// Audio audio
	Audio = "2_0",
	// AudioLossless lossless audio
	AudioLossless = "2_1",
	// AudioLossy lossy audio
	AudioLossy = "2_2",

	// Literature literature
	Literature = "3_0",
	// LiteratureEnglishTranslated english translated literature
	LiteratureEnglishTranslated = "3_1",
	// LiteratureNonEnglishTranslated non-english translated literature
	LiteratureNonEnglishTranslated = "3_2",
	// LiteratureRaw raw literature
	LiteratureRaw = "3_3",

	// LiveAction live action
	LiveAction = "4_0",
	// LiveActionEnglishTranslated english-translated live action
	LiveActionEnglishTranslated = "4_1",
	// LiveActionIdolOrPromotionVideo live action idol or promotional video
	LiveActionIdolOrPromotionVideo = "4_2",
	// LiveActionNonEnglishTranslated non-english translated live action
	LiveActionNonEnglishTranslated = "4_3",
	// LiveActionRaw raw live action
	LiveActionRaw = "4_4",

	// Pictures pictures
	Pictures = "5_0",
	// PicturesGraphics picture graphics
	PicturesGraphics = "5_1",
	// PicturesPhotos picture photos
	PicturesPhotos = "5_2",

	// Software software
	Software = "6_0",
	// SoftwareApplications software applications
	SoftwareApplications = "6_1",
	// SoftwareGames software games
	SoftwareGames = "6_2",
}

export enum SortOption {
  // Comment sort by comment
	Comment = "comments",
	// Size sort by torrent size
	Size = "size",
	// Date sort by torrent added
	Date = "id",
	// Seeders sort by number of seeders
	Seeders = "seeders",
	// Leechers sort by number of leechers
	Leechers = "leechers",
	// Downloads sort by completed downloads
	Downloads = "downloads",
}

export enum OrderOption {
  // Asc ascending order
	Asc = "asc",
	// Desc descending order
	Desc = "desc",
}

export interface IQueryData {
  query: string;
  filter: FilterOption;
  category: CategoryOption;
  sort: SortOption;
  order: OrderOption;
  page: number;
}

export default class PostQueryData {
  private _query: string = "";
  private _filter: FilterOption = FilterOption.NoFilter;
  private _category: CategoryOption = CategoryOption.AllCategories;
  private _sort: SortOption = SortOption.Date;
  private _order: OrderOption = OrderOption.Desc;
  private _page: number = 0;
  
  get query(): string {
    return this._query;
  }

  set query(query: string) {
    this._query = query;
  }

  get filter(): FilterOption {
    return this._filter;
  }

  set filter(filter: FilterOption) {
    this._filter = filter;
  }

  get category(): CategoryOption {
    return this._category;
  }

  set category(category: CategoryOption) {
    this._category = category;
  }

  get sort(): SortOption {
    return this._sort;
  }

  set sort(sort: SortOption) {
    this._sort = sort;
  }

  get order(): OrderOption {
    return this._order;
  }

  set order(order: OrderOption) {
    this._order = order;
  }

  get page(): number {
    return this._page;
  }

  set page(page: number) {
    this._page = page;
  }

  get data(): IQueryData {
    return {
      query: this._query,
      filter: this._filter,
      category: this._category,
      sort: this._sort,
      order: this._order,
      page: this._page,
    }
  }
}