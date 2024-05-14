<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class AppInfo
 * 
 * @property int $id
 * @property string $name
 * @property string $version
 * @property string|null $description
 * @property string|null $author
 * @property string|null $author_url
 * @property string|null $email
 * @property string $meta_title
 * @property string|null $meta_description
 * @property string|null $meta_keywords
 * @property string|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class AppInfo extends Model
{
	use SoftDeletes;
	protected $table = 'app_info';

	protected $fillable = [
		'name',
		'version',
		'description',
		'author',
		'author_url',
		'email',
		'meta_title',
		'meta_description',
		'meta_keywords'
	];
}
