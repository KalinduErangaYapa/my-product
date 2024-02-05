<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageUploadTrait
{
    public function imageUploader(mixed $request, string $name, string $path): mixed
    {
        try {
            if ($request->has($name)) {
                return $request->$name->store($path, 'public');
            } else {
                return null;
            }
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * @return [type]
     */
    public function imageDelete(int $id, mixed $repository, string $imageName)
    {
        $image = $repository->findTrashedById($id);
        if ($image->$imageName != null) {
            $repository->updateWithTrashed($id, [$imageName => null]);
            Storage::disk('s3')->delete($image->$imageName);

            return response()->json([
                'message' => 'Image deleted successfully',
            ], 201);
        } else {
            return response()->json([
                'message' => 'Image not found',
            ], 404);
        }
    }

    /**
     * @return [type]
     */
    public function imageRemove(int $id, mixed $repository, string $imageName)
    {
        $image = $repository->findById($id);
        if ($image->$imageName != null) {
            $repository->deleteById($id);
            Storage::disk('s3')->delete($image->$imageName);

            return response()->json([
                'message' => 'Image deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Image not found',
            ], 404);
        }
    }

    /**
     * @return [type]
     */
    public function imageDeleteWithMeta(int $id, mixed $repository, string $metaName)
    {
        $image = $repository->findTrashedById($id);
        if ($image->$metaName != null) {
            $image->setMeta([
                $metaName => null,
            ]);
            $image->update();
            Storage::disk('s3')->delete($image->$metaName);

            return response()->json([
                'message' => 'Image deleted successfully',
            ], 201);
        } else {
            return response()->json([
                'message' => 'Image not found',
            ], 404);
        }
    }
}
